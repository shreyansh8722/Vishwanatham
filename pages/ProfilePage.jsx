import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { 
  LogOut, Package, MapPin, Settings, 
  Shield, User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MyOrders } from '@/components/profile/MyOrders';

// --- MINIMALIST SIDEBAR ITEM ---
const MenuItem = ({ icon: Icon, label, active, onClick, danger }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-4 transition-all duration-300 group border-l-2
      ${active 
        ? 'border-heritage-gold bg-stone-50 text-heritage-charcoal' 
        : 'border-transparent text-stone-400 hover:text-stone-800 hover:bg-stone-50/50'
      }
      ${danger && 'hover:text-red-600 hover:border-red-200'}
    `}
  >
    <Icon size={18} strokeWidth={1.5} className={active ? "text-heritage-gold" : "group-hover:scale-105 transition-transform"} />
    <span className={`text-xs uppercase tracking-[0.15em] font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const TabContent = ({ children, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="h-full"
  >
    <div className="mb-10 border-b border-stone-100 pb-6">
      <h2 className="text-3xl font-serif text-heritage-charcoal italic mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-stone-400 font-light font-sans">{subtitle}</p>}
    </div>
    {children}
  </motion.div>
);

export default function ProfilePage() {
  // 1. Get userRole from hook (Make sure useAuth.jsx is updated first!)
  const { user, userRole, logout } = useAuth(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  
  // 2. Secure Check: Only true if Firestore says role is "admin"
  const isAdmin = userRole === 'admin';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-heritage-charcoal selection:bg-heritage-gold selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:w-64 shrink-0">
            <div className="sticky top-32">
              
              {/* User Info */}
              <div className="mb-12 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-heritage-gold text-2xl font-serif mb-4">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user.displayName?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <h3 className="font-serif text-xl text-heritage-charcoal mb-1">
                  {user.displayName || 'Guest User'}
                </h3>
                
                {/* Visual Badge for Admins */}
                {isAdmin && (
                  <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-bold uppercase tracking-widest rounded-sm mb-2">
                    Administrator
                  </span>
                )}
                
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  {user.email}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {/* 3. Render Admin Dashboard Button based on Role */}
                {isAdmin && (
                  <MenuItem 
                    icon={Shield} 
                    label="Admin Dashboard" 
                    onClick={() => navigate('/admin')} 
                  />
                )}
                
                <MenuItem 
                  icon={Package} 
                  label="Orders" 
                  active={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')} 
                />
                
                <MenuItem 
                  icon={MapPin} 
                  label="Addresses" 
                  active={activeTab === 'addresses'}
                  onClick={() => setActiveTab('addresses')} 
                />
                
                <MenuItem 
                  icon={Settings} 
                  label="Settings" 
                  active={activeTab === 'settings'}
                  onClick={() => setActiveTab('settings')} 
                />
                
                <div className="pt-8 mt-8 border-t border-stone-100">
                  <MenuItem 
                    icon={LogOut} 
                    label="Sign Out" 
                    onClick={handleLogout} 
                    danger
                  />
                </div>
              </nav>
            </div>
          </div>
          
          {/* --- RIGHT CONTENT --- */}
          <div className="flex-1 min-h-[600px]">
            <AnimatePresence mode='wait'>
              
              {activeTab === 'orders' && (
                <TabContent key="orders" title="My Orders" subtitle="Track, return, or exchange your purchases.">
                  <MyOrders userId={user.uid} />
                </TabContent>
              )}
              
              {activeTab === 'addresses' && (
                <TabContent key="addresses" title="Addresses" subtitle="Manage your shipping destinations.">
                  <div className="p-12 border border-dashed border-stone-200 rounded-sm bg-stone-50/50 text-center flex flex-col items-center justify-center">
                    <MapPin size={32} className="text-stone-300 mb-4" strokeWidth={1} />
                    <p className="text-sm text-stone-500 mb-6 font-light max-w-sm">
                        We save your address automatically when you place your first order.
                    </p>
                    <button onClick={() => setActiveTab('orders')} className="text-xs font-bold uppercase tracking-widest text-heritage-gold hover:text-heritage-charcoal transition-colors border-b border-heritage-gold pb-1">
                      View Orders
                    </button>
                  </div>
                </TabContent>
              )}
              
              {activeTab === 'settings' && (
                <TabContent key="settings" title="Settings" subtitle="Update your personal information.">
                  <form className="max-w-lg space-y-10">
                    <div className="space-y-8">
                        <div className="group">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3 group-focus-within:text-heritage-gold transition-colors">Full Name</label>
                            <input 
                                type="text" 
                                defaultValue={user.displayName} 
                                className="w-full border-b border-stone-200 py-2 text-xl font-serif text-heritage-charcoal focus:border-heritage-gold outline-none bg-transparent transition-colors" 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Email</label>
                            <input 
                                type="email" 
                                defaultValue={user.email} 
                                disabled 
                                className="w-full border-b border-stone-200 py-2 text-stone-400 bg-transparent cursor-not-allowed font-sans" 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3 group-focus-within:text-heritage-gold transition-colors">Phone</label>
                            <input 
                                type="tel" 
                                placeholder="+91"
                                className="w-full border-b border-stone-200 py-2 text-xl font-serif text-heritage-charcoal focus:border-heritage-gold outline-none bg-transparent transition-colors" 
                            />
                        </div>
                    </div>
                    
                    <button className="px-10 py-4 bg-heritage-charcoal text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-heritage-gold transition-all shadow-lg rounded-sm">
                      Update Profile
                    </button>
                  </form>
                </TabContent>
              )}
              
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}