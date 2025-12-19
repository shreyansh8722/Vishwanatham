import React, { useContext } from 'react';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Logo from '../assets/logo.png'; 

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.06 6.21C12.06 13.52 17.53 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.6 28.71c-.48-1.45-.76-2.99-.76-4.6s.27-3.14.76-4.6l-8.06-6.21C.96 16.07 0 20.01 0 24s.96 7.93 2.56 11.11l8.04-6.4z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.47 0-11.94-4.02-13.9-9.42l-8.06 6.21C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

// CHANGED: export default function -> export function
export function LoginPromptModal({ open, onClose }) {
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-sm shadow-2xl w-full max-w-[380px] p-6 text-center relative overflow-hidden border-t-4 border-[#B08D55]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-4 flex justify-center">
          <img
            src={Logo}
            alt="Pahnawa Banaras"
            className="h-50 object-contain"
          />
        </div>

        <h2 className="font-serif text-xl text-gray-900 mb-2">
          Experience Heritage
        </h2>
        
        <p className="text-gray-500 text-xs mb-6 font-light leading-relaxed px-2">
          Sign in to save your favorite weaves, track orders, and access exclusive member-only collections.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="bg-[#F9F9F9] p-2.5 rounded-sm border border-gray-100 flex flex-col items-center gap-1.5">
              <Heart size={18} className="text-[#B08D55]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Wishlist</span>
           </div>
           <div className="bg-[#F9F9F9] p-2.5 rounded-sm border border-gray-100 flex flex-col items-center gap-1.5">
              <ShoppingBag size={18} className="text-[#B08D55]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Orders</span>
           </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-sm py-3 font-medium text-sm flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mt-4 text-[9px] text-gray-400 uppercase tracking-wider">
          Secure Login • Pahnawa Banaras
        </div>
      </div>
    </div>
  );
}