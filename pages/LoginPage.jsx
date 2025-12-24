import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('otp'); // 'otp' or 'password'
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-heritage-parchment flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#BC002D 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-heritage-mist overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="bg-heritage-charcoal p-6 text-center">
          <h2 className="font-heading text-2xl text-heritage-saffron font-bold">Welcome Back</h2>
          <p className="text-gray-400 text-xs mt-1">Log in to access your saved Sankalp & Orders</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          
          {/* Toggle Method */}
          <div className="flex bg-heritage-parchment rounded-lg p-1 mb-8">
            <button 
              onClick={() => setMethod('otp')}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${method === 'otp' ? 'bg-white shadow text-heritage-rudraksha' : 'text-heritage-grey hover:text-heritage-charcoal'}`}
            >
              Login with OTP
            </button>
            <button 
              onClick={() => setMethod('password')}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${method === 'password' ? 'bg-white shadow text-heritage-rudraksha' : 'text-heritage-grey hover:text-heritage-charcoal'}`}
            >
              Password
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {method === 'otp' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-heritage-charcoal uppercase tracking-wider">Mobile Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-grey" />
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="w-full pl-10 pr-4 py-3 border border-heritage-mist rounded-lg focus:border-heritage-rudraksha outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-heritage-charcoal uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="devotee@example.com" 
                    className="w-full px-4 py-3 border border-heritage-mist rounded-lg focus:border-heritage-rudraksha outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-heritage-charcoal uppercase tracking-wider">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 border border-heritage-mist rounded-lg focus:border-heritage-rudraksha outline-none transition-colors"
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-heritage-rudraksha to-heritage-crimson text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                <>
                  {method === 'otp' ? 'Get OTP' : 'Secure Login'} <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-xs text-heritage-grey">
              New to Vishwanatham? <Link to="/signup" className="text-heritage-rudraksha font-bold hover:underline">Create Account</Link>
            </p>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-green-700 bg-green-50 py-2 rounded border border-green-100">
              <ShieldCheck size={12} />
              <span>Your personal details are 100% encrypted & secure.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;