import React, { useContext } from 'react';
import { LoginModalContext } from '../context/LoginModalContext';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPromptModal = () => {
  const context = useContext(LoginModalContext);
  
  if (!context) return null;
  
  const { isLoginPromptOpen, closeLoginPrompt } = context;

  if (!isLoginPromptOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeLoginPrompt}></div>
      <div className="relative bg-white p-8 w-full max-w-sm text-center shadow-xl animate-fade-in-up rounded-lg border border-heritage-border">
        <button onClick={closeLoginPrompt} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-heritage-grey hover:text-heritage-charcoal transition-colors" />
        </button>
        <h3 className="font-cormorant text-2xl mb-4 text-heritage-charcoal font-bold">Please Log In</h3>
        <p className="font-montserrat text-sm text-heritage-grey mb-6">You need to be logged in to perform this action.</p>
        <Link 
          to="/login" 
          onClick={closeLoginPrompt}
          className="block w-full bg-heritage-gold text-white py-3 text-xs uppercase tracking-widest hover:bg-heritage-clay transition-colors font-bold shadow-md hover:shadow-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default LoginPromptModal;