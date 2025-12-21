import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, 
  MessageSquare, Layers, Tag, Settings, 
  ChevronRight, Bell, Search, Menu, X, LogOut,
  Palette, BarChart3, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

// --- Import All Managers ---
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ProductManager } from '../components/admin/ProductManager';
import { OrderManager } from '../components/admin/OrderManager';
import { InventoryManager } from '../components/admin/InventoryManager';
import { CustomerManager } from '../components/admin/CustomerManager'; // Fixed Import
import { MessageInbox } from '../components/admin/MessageInbox';
import { ContentManager } from '../components/admin/ContentManager';
import { StorefrontManager } from '../components/admin/StorefrontManager';
import { CouponManager } from '../components/admin/CouponManager';
import { SettingsManager } from '../components/admin/SettingsManager';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const menuItems = [
    {
      category: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      category: "Store Management",
      items: [
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'inventory', label: 'Inventory', icon: BarChart3 },
      ]
    },
    {
      category: "Customers",
      items: [
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'inbox', label: 'Inbox', icon: MessageSquare },
        { id: 'content', label: 'Reviews & FAQs', icon: Layers },
      ]
    },
    {
      category: "Marketing & Design",
      items: [
        { id: 'storefront', label: 'Online Store', icon: Palette },
        { id: 'coupons', label: 'Discounts', icon: Tag },
      ]
    },
    {
      category: "System",
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard onChangeTab={setActiveTab} />;
      case 'products': return <ProductManager />;
      case 'orders': return <OrderManager />;
      case 'inventory': return <InventoryManager />;
      case 'customers': return <CustomerManager />;
      case 'inbox': return <MessageInbox />;
      case 'content': return <ContentManager />;
      case 'storefront': return <StorefrontManager />;
      case 'coupons': return <CouponManager />;
      case 'settings': return <SettingsManager />;
      default: return <AdminDashboard onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-manrope">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] text-gray-400 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-[#1a1a1a]">
           <Globe className="text-[#B08D55] mr-3" size={24} />
           <span className="text-white font-serif font-bold text-lg tracking-wide">Vishwanatham</span>
           <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden text-gray-400">
             <X size={20} />
           </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-8 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
          {menuItems.map((group, idx) => (
            <div key={idx}>
              <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{group.category}</h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                          ${isActive 
                            ? 'bg-[#B08D55] text-white shadow-lg shadow-[#B08D55]/20' 
                            : 'hover:bg-gray-800 hover:text-gray-100'
                          }`}
                      >
                        <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} />
                        {item.label}
                        {isActive && <ChevronRight size={14} className="absolute right-3 opacity-50" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md">
                 <Menu size={20} />
              </button>
              <h1 className="font-serif text-xl font-bold text-gray-900 capitalize">
                {menuItems.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
              </h1>
           </div>
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-[#1a1a1a] text-[#B08D55] flex items-center justify-center font-bold text-xs border-2 border-gray-100">V</div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

export default AdminPage;