import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('login'); // login | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openLoginModal = () => { setError(''); setView('login'); setIsOpen(true); };
  const closeLoginModal = () => setIsOpen(false);

  const ensureUserProfile = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
      });
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let result;
      if (view === 'login') {
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(result.user);
      }
      closeLoginModal();
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await ensureUserProfile(result.user);
      closeLoginModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeLoginModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-sm shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Header Image/Banner */}
              <div className="h-32 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h2 className="text-white font-serif text-2xl relative z-10">
                  {view === 'login' ? 'Welcome Back' : 'Join Pahnawa'}
                </h2>
                <button onClick={closeLoginModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {error && <div className="mb-4 text-xs text-red-500 bg-red-50 p-2 border border-red-100 rounded-sm">{error}</div>}
                
                <form onSubmit={handleAuth} className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} 
                          className="w-full border border-gray-200 pl-9 pr-3 py-2.5 text-sm rounded-sm focus:border-[#B08D55] outline-none" placeholder="name@email.com" />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} 
                          className="w-full border border-gray-200 pl-9 pr-3 py-2.5 text-sm rounded-sm focus:border-[#B08D55] outline-none" placeholder="••••••••" />
                      </div>
                   </div>

                   <button disabled={loading} className="w-full bg-[#B08D55] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#8c6a40] transition-colors rounded-sm flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="animate-spin" size={16} /> : (view === 'login' ? 'Sign In' : 'Create Account')}
                   </button>
                </form>

                <div className="mt-6">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-300 text-[10px] uppercase">Or continue with</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>
                  <button onClick={handleGoogle} className="w-full border border-gray-200 py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors rounded-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    <span className="text-xs font-bold text-gray-600">Google</span>
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="ml-1 text-[#B08D55] font-bold hover:underline">
                      {view === 'login' ? 'Sign Up' : 'Log In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LoginModalContext.Provider>
  );
};