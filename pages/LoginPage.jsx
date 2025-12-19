import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

// --- VALIDATION SCHEMAS ---
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema;

export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // FIX: Added useLocation
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : signupSchema)
  });

  useEffect(() => {
    reset();
    setError(null);
    setSuccessMsg(null);
  }, [mode, reset]);

  // FIX: Redirect back to previous page (Checkout) if specified
  useEffect(() => {
    if (user) {
        // If state.from exists (passed from CartModal), go there. Else profile.
        const from = location.state?.from || '/profile';
        navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const ensureUserProfile = async (firebaseUser) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        favorites: [],
        cart: [],
        createdAt: new Date()
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, data.email);
        setSuccessMsg("We've sent a password reset link to your email.");
        setLoading(false);
        return;
      }

      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await ensureUserProfile(userCredential.user);
      }
    } catch (err) {
      let msg = err.message.replace('Firebase: ', '');
      if (msg.includes('auth/invalid-credential')) msg = "Incorrect email or password.";
      if (msg.includes('auth/email-already-in-use')) msg = "This email is already registered.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await ensureUserProfile(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-heritage-paper font-sans text-heritage-charcoal flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-20 px-4 relative">
        <div className="w-full max-w-md">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl italic mb-3 text-heritage-charcoal">
              {mode === 'forgot' ? 'Reset Password' : mode === 'login' ? 'Welcome Back' : 'Join the Family'}
            </h1>
            <p className="text-xs uppercase tracking-widest text-heritage-grey">
              {mode === 'forgot' ? 'Enter your email to recover access' : mode === 'login' ? 'Access your wishlist & orders' : 'Begin your journey with Banaras'}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="flex items-center gap-3 text-red-800 text-xs font-medium bg-red-50 p-4 mb-8 border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          {successMsg && (
            <div className="flex items-center gap-3 text-green-800 text-xs font-medium bg-green-50 p-4 mb-8 border border-green-100">
              <CheckCircle size={16} /> {successMsg}
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Email Address</label>
              <input
                {...register("email")}
                type="email"
                className="w-full border-b border-gray-300 py-3 bg-transparent text-sm focus:border-heritage-gold outline-none transition-colors placeholder:text-gray-300"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-red-500 text-[10px] pt-1">{errors.email.message}</p>}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('forgot')} className="text-[10px] text-heritage-grey hover:text-heritage-gold transition-colors">
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full border-b border-gray-300 py-3 bg-transparent text-sm focus:border-heritage-gold outline-none transition-colors placeholder:text-gray-300"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-[10px] pt-1">{errors.password.message}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-heritage-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-gold transition-all duration-300 flex justify-center items-center gap-2 mt-8 disabled:opacity-70"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              {mode === 'forgot' ? 'Send Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          {/* Social & Toggle Options */}
          {mode !== 'forgot' && (
            <div className="mt-8 space-y-6">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] uppercase tracking-widest text-gray-300">Or</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full border border-gray-200 text-heritage-charcoal py-3 text-xs uppercase tracking-widest font-bold hover:border-heritage-charcoal transition-colors flex items-center justify-center gap-3"
              >
                <span className="font-serif italic text-lg">G</span> Continue with Google
              </button>
            </div>
          )}

          <div className="text-center mt-10">
            {mode === 'forgot' ? (
              <button onClick={() => setMode('login')} className="text-xs uppercase tracking-widest border-b border-heritage-gold pb-0.5 hover:text-heritage-gold transition-colors">
                Return to Login
              </button>
            ) : (
              <p className="text-xs text-heritage-grey">
                {mode === 'login' ? "New to Pahnawa? " : "Already a member? "}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} 
                  className="underline underline-offset-4 decoration-heritage-gold hover:text-heritage-gold transition-colors font-medium ml-1"
                >
                  {mode === 'login' ? "Create an Account" : "Sign In"}
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}