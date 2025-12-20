import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, signup } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    if (user) {
        const from = location.state?.from || '/profile';
        navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') await login(data.email, data.password);
      else await signup(data.email, data.password);
    } catch (err) {
      setError("Invalid credentials or account already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-heritage-paper flex pt-20">
      
      {/* Left Side: Visual/Brand */}
      <div className="hidden lg:flex w-1/2 bg-heritage-charcoal relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <img 
          src="https://images.unsplash.com/photo-1621262657790-23a54728551f?q=80&w=1200&auto=format&fit=crop" 
          alt="Kashi Rituals"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="relative z-10 text-center text-heritage-paper p-12 max-w-lg">
          <h2 className="font-cormorant text-5xl mb-6">Join the Sankalp</h2>
          <p className="font-montserrat text-sm leading-7 tracking-wide text-heritage-sand/80">
            "Unlock exclusive access to live darshans, track your spiritual journey, and curate your personal altar with authentic artifacts."
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="font-cormorant text-4xl text-heritage-charcoal mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
            </h1>
            <p className="text-xs uppercase tracking-widest text-heritage-grey">
              {mode === 'login' ? 'Sign in to access your account' : 'Create an account to get started'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Email</label>
              <input {...register("email")} className="w-full border-b border-heritage-border py-3 text-sm focus:border-heritage-gold outline-none transition-colors" placeholder="name@example.com" />
              {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Password</label>
                {mode === 'login' && <button type="button" className="text-[10px] text-heritage-gold hover:underline">Forgot Password?</button>}
              </div>
              <input type="password" {...register("password")} className="w-full border-b border-heritage-border py-3 text-sm focus:border-heritage-gold outline-none transition-colors" placeholder="••••••••" />
              {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-heritage-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-gold transition-all flex justify-center gap-2">
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-heritage-border"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] text-heritage-grey/50 uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-heritage-border"></div>
          </div>

          <button className="w-full border border-heritage-border text-heritage-charcoal py-3 text-xs font-bold uppercase tracking-widest hover:border-heritage-gold transition-colors flex items-center justify-center gap-2">
            <span className="font-serif italic text-lg">G</span> Continue with Google
          </button>

          <p className="text-center text-xs text-heritage-grey mt-8">
            {mode === 'login' ? "New here? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); reset(); setError(null); }} className="text-heritage-gold font-bold underline underline-offset-4">
              {mode === 'login' ? "Create Account" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}