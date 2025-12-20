import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase'; // Direct import
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // We only need 'user' from context

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    if (user) {
        const from = location.state?.from || '/profile';
        navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // --- THE FIX: Create User in Firestore ---
  const ensureUserProfile = async (firebaseUser) => {
    if (!firebaseUser) return;
    
    const userRef = doc(db, 'users', firebaseUser.uid);
    try {
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Devotee',
          role: 'user', // Default role. Change to 'admin' manually in Firebase Console.
          favorites: [],
          cart: [],
          createdAt: serverTimestamp()
        });
        console.log("User profile created in DB!");
      }
    } catch (e) {
      console.error("Error creating user profile:", e);
    }
  };

  const onSubmit = async (data) => {
    setAuthLoading(true);
    setError(null);
    try {
      let result;
      if (mode === 'login') {
        result = await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
      
      // Force Database Creation
      await ensureUserProfile(result.user);
      
    } catch (err) {
      console.error(err);
      let msg = "Authentication failed.";
      if (err.message.includes("invalid-credential")) msg = "Incorrect email or password.";
      if (err.message.includes("email-already-in-use")) msg = "Email already in use.";
      setError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setError(null);
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // Force Database Creation
        await ensureUserProfile(result.user);
    } catch (err) {
        console.error(err);
        setError("Google login failed.");
    } finally {
        setAuthLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-heritage-paper flex pt-20">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-heritage-rudraksha relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 text-center text-white p-12 max-w-lg">
          <h2 className="font-cinzel text-4xl font-bold mb-6">Join the Sankalp</h2>
          <p className="font-manrope text-base leading-7 text-white/90">
            "Unlock exclusive access to live darshans, track your spiritual journey."
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="font-cinzel text-3xl font-bold text-heritage-charcoal mb-2">
              {mode === 'login' ? 'Welcome back' : 'Begin your journey'}
            </h1>
            <p className="text-sm text-heritage-grey">
              {mode === 'login' ? 'Sign in to access your account' : 'Create an account to get started'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 text-sm rounded-r-md">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-heritage-charcoal">Email</label>
              <input {...register("email")} className="w-full border border-heritage-mist rounded-md px-4 py-3 text-sm focus:border-heritage-rudraksha outline-none" placeholder="name@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-heritage-charcoal">Password</label>
                {mode === 'login' && <button type="button" className="text-xs text-heritage-rudraksha font-semibold hover:underline">Forgot password?</button>}
              </div>
              <input type="password" {...register("password")} className="w-full border border-heritage-mist rounded-md px-4 py-3 text-sm focus:border-heritage-rudraksha outline-none" placeholder="••••••••" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={authLoading} className="w-full bg-heritage-charcoal text-white py-3.5 text-sm font-bold rounded-md hover:bg-heritage-rudraksha transition-all flex justify-center gap-2 shadow-md">
              {authLoading ? <Loader2 className="animate-spin w-4 h-4" /> : (mode === 'login' ? 'Sign in' : 'Create account')}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-heritage-mist"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-heritage-grey">Or</span>
            <div className="flex-grow border-t border-heritage-mist"></div>
          </div>

          <button onClick={handleGoogleLogin} type="button" className="w-full border border-heritage-mist rounded-md text-heritage-charcoal py-3 text-sm font-bold hover:border-heritage-rudraksha hover:bg-heritage-sand transition-colors flex items-center justify-center gap-2">
            <span className="font-serif italic text-lg text-heritage-rudraksha">G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-heritage-grey mt-8">
            {mode === 'login' ? "New here? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); reset(); setError(null); }} className="text-heritage-rudraksha font-bold hover:underline">
              {mode === 'login' ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}