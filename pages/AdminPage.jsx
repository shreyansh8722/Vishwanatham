import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, 
  Settings, LogOut, Menu, X, Shield, MessageSquare, 
  Ticket, LayoutTemplate, Globe, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Admin Components
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { OrderManager } from '../components/admin/OrderManager';
import { ProductManager } from '../components/admin/ProductManager';
import { InventoryManager } from '../components/admin/InventoryManager';
import { MessageInbox } from '../components/admin/MessageInbox';
import { CouponManager } from '../components/admin/CouponManager';
import { StorefrontManager } from '../components/admin/StorefrontManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { SubscriberManager } from '../components/admin/SubscriberManager';
import { ContentManager } from '../components/admin/ContentManager'; 

// --- NavItem Component ---
const NavItem = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
      isActive 
        ? 'bg-[#B08D55] text-white shadow-lg shadow-[#B08D55]/20' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
    {label}
    
    {isActive && (
      <motion.div 
        layoutId="active-pill" 
        className="ml-auto w-1.5 h-1.5 bg-white rounded-full" 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </button>
);

export default function AdminPage() {
  const { user, userRole, loading, logout } = useAuth(); // Get userRole
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true); 
  const [toast, setToast] = useState(null);

  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    if(window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !user) return (
    <div className="h-screen flex items-center justify-center text-[#B08D55] bg-gray-50 font-serif text-xl animate-pulse">
        Loading Admin Portal...
    </div>
  );

  // CHECK ROLE INSTEAD OF EMAIL
  if (userRole !== 'admin') {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <div className="bg-red-50 p-4 rounded-full mb-4">
           <Shield size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Access Restricted</h1>
        <p className="text-gray-500 mb-6 max-w-md">This area is restricted to administrators only.</p>
        <button onClick={() => navigate('/')} className="bg-[#1A1A1A] text-white px-6 py-3 rounded-lg hover:bg-black transition-all">
            Return to Store
        </button>
      </div>
    );
  }

  const renderContent = () => {
    const props = { notify }; 
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard {...props} onChangeTab={setActiveTab} />;
      case 'orders': return <OrderManager {...props} />;
      case 'products': return <ProductManager {...props} />;
      case 'inventory': return <InventoryManager {...props} />;
      case 'coupons': return <CouponManager {...props} />;
      case 'storefront': return <StorefrontManager {...props} />;
      case 'settings': return <SettingsManager {...props} />;
      case 'subscribers': return <SubscriberManager {...props} />;
      case 'messages': return <MessageInbox {...props} />;
      case 'content': return <ContentManager {...props} />;
      default: return <AdminDashboard {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1A1A1A] z-40 flex items-center px-4 justify-between text-white shadow-md">
         <div className="font-serif font-bold text-xl text-[#B08D55]">Pahnawa Admin</div>
         <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
             {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
         </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#1A1A1A] text-white transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-gray-800
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 flex flex-col
      `}>
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl text-[#B08D55] tracking-wide">Pahnawa</h1>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Live Store</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white">
             <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-hide">
          <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 mt-2">Overview</p>
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={handleNavClick} />
          <NavItem id="messages" icon={MessageSquare} label="Inbox" isActive={activeTab === 'messages'} onClick={handleNavClick} />
          
          <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 mt-8">Commerce</p>
          <NavItem id="orders" icon={ShoppingBag} label="Orders" isActive={activeTab === 'orders'} onClick={handleNavClick} />
          <NavItem id="products" icon={Package} label="Products" isActive={activeTab === 'products'} onClick={handleNavClick} />
          <NavItem id="inventory" icon={Settings} label="Inventory" isActive={activeTab === 'inventory'} onClick={handleNavClick} />
          
          <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 mt-8">Growth</p>
          <NavItem id="coupons" icon={Ticket} label="Coupons" isActive={activeTab === 'coupons'} onClick={handleNavClick} />
          <NavItem id="subscribers" icon={Users} label="Subscribers" isActive={activeTab === 'subscribers'} onClick={handleNavClick} />
          
          <p className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 mt-8">Configuration</p>
          <NavItem id="content" icon={Menu} label="Menu Content" isActive={activeTab === 'content'} onClick={handleNavClick} />
          <NavItem id="storefront" icon={LayoutTemplate} label="Home Page" isActive={activeTab === 'storefront'} onClick={handleNavClick} />
          <NavItem id="settings" icon={Globe} label="Settings" isActive={activeTab === 'settings'} onClick={handleNavClick} />
        </nav>

        <div className="p-4 border-t border-gray-800 bg-[#151515]">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col h-screen pt-16 md:pt-0 bg-gray-50 relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
          {/* Header */}
          <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div>
               <h2 className="text-3xl font-bold text-gray-900 capitalize font-serif tracking-tight">
                   {activeTab === 'storefront' ? 'Home Page Editor' : activeTab}
               </h2>
               <p className="text-sm text-gray-500 mt-1">
                 {activeTab === 'storefront' 
                    ? 'Control the Spotlight, Fabric, and Muse sections of your homepage.'
                    : `Manage your ${activeTab} and view performance.`}
               </p>
             </div>
             
             <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100 pr-6">
                <div className="w-10 h-10 bg-[#B08D55] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
                    {user?.email ? user.email[0].toUpperCase() : 'A'}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">Administrator</span>
                    <span className="text-[10px] text-gray-500">{user?.email}</span>
                </div>
             </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
             {renderContent()}
          </div>
        </div>

        {/* Global Toast Notification */}
        <AnimatePresence>
            {toast && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, x: '-50%' }} 
                    animate={{ opacity: 1, y: 0, x: '-50%' }} 
                    exit={{ opacity: 0, y: 50, x: '-50%' }} 
                    className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-full shadow-2xl bg-[#1A1A1A] text-white"
                >
                    {toast.type === 'error' ? <AlertCircle size={18} className="text-red-400" /> : <CheckCircle size={18} className="text-green-400" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
}