import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; 
import { Package, User, MapPin, LogOut, ShieldCheck, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock Orders Data
  const MOCK_ORDERS = [
    {
      id: "#ORD-7782",
      date: "Dec 18, 2025",
      total: 3500,
      status: "Delivered",
      items: [{ name: "5 Mukhi Rudraksha Mala", image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=200" }]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- SIDEBAR --- */}
          <div className="w-full md:w-64 flex-shrink-0">
            {/* User Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center mb-6 shadow-sm">
              <div className="w-20 h-20 bg-orange-50 rounded-full mx-auto flex items-center justify-center mb-4 text-[#8B4513] text-2xl font-bold border border-orange-100">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <h2 className="text-lg font-bold text-[#2C2C2C] font-serif">{user.name || 'Devotee'}</h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              
              {/* --- THE MISSING BUTTON IS HERE --- */}
              {user.role === 'admin' && (
                <Link 
                  to="/admin"
                  className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-white bg-[#8B4513] hover:bg-[#6F370F] transition-colors"
                >
                  <ShieldCheck size={18} /> Admin Dashboard
                </Link>
              )}

              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'orders' ? 'bg-orange-50 text-[#8B4513]' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Package size={18} /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'settings' ? 'bg-orange-50 text-[#8B4513]' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <User size={18} /> Profile Details
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'addresses' ? 'bg-orange-50 text-[#8B4513]' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <MapPin size={18} /> Addresses
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="flex-1">
            
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#2C2C2C] mb-4">My Orders</h2>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <span className="block text-xs text-gray-500">Order placed</span>
                        <span className="font-bold text-[#2C2C2C]">{order.date}</span>
                      </div>
                      <span className="text-green-700 text-xs font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100 flex items-center gap-1">
                        <CheckCircle size={12} /> {order.status}
                      </span>
                    </div>
                    <div className="p-4">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-4">
                           <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                           <span className="font-serif text-sm font-bold">{item.name}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#2C2C2C] mb-6">Profile Details</h2>
                <div className="space-y-4">
                   <div className="bg-yellow-50 border border-yellow-200 p-4 rounded text-sm text-yellow-800">
                      Your Role: <span className="font-bold uppercase">{user.role || 'USER'}</span>
                      {user.role !== 'admin' && <span className="block text-xs mt-1 text-yellow-600">(Change this to 'admin' in Firebase Console to see the Dashboard button)</span>}
                   </div>
                   {/* Add other inputs here if needed */}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
                <MapPin className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No addresses saved.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;