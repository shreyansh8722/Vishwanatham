import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (user) navigate(location.state?.from || '/profile', { replace: true });
  }, [user, navigate, location]);

  const ensureUserProfile = async (firebaseUser) => {
    if (!firebaseUser) return;
    const userRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'Devotee',
        role: 'user',
        createdAt: serverTimestamp()
      });
    }
  };

  const onSubmit = async (data) => {
    setAuthLoading(true); setError(null);
    try {
      const result = mode === 'login' 
        ? await signInWithEmailAndPassword(auth, data.email, data.password)
        : await createUserWithEmailAndPassword(auth, data.email, data.password);
      await ensureUserProfile(result.user);
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally { setAuthLoading(false); }
  };

  return (
    <div className="min-h-screen bg-heritage-paper flex pt-20 font-body">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-heritage-rudraksha relative items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center text-white p-12 max-w-lg">
          <h2 className="font-heading text-5xl mb-6">Join the Sankalp</h2>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            "Unlock exclusive access to live darshans and track your spiritual journey."
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-heritage-charcoal mb-2">
              {mode === 'login' ? 'Welcome back' : 'Begin Journey'}
            </h1>
            <p className="text-sm text-heritage-grey">
              {mode === 'login' ? 'Sign in to access your account' : 'Create an account to get started'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 text-sm flex items-center gap-2 rounded-sm border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input {...register("email")} className="w-full border-b border-heritage-mist py-3 text-sm focus:border-heritage-rudraksha outline-none bg-transparent placeholder-heritage-grey/50" placeholder="Email Address" />
            <input type="password" {...register("password")} className="w-full border-b border-heritage-mist py-3 text-sm focus:border-heritage-rudraksha outline-none bg-transparent placeholder-heritage-grey/50" placeholder="Password" />

            <button type="submit" disabled={authLoading} className="w-full bg-heritage-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-rudraksha transition-all shadow-lg mt-4">
              {authLoading ? <Loader2 className="animate-spin w-4 h-4 mx-auto" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="text-center pt-4">
             <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); reset(); setError(null); }} className="text-heritage-rudraksha text-xs font-bold uppercase tracking-widest border-b border-heritage-rudraksha pb-0.5">
               {mode === 'login' ? "Create an account" : "Sign in instead"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}