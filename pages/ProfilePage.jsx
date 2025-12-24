import React, { useState } from 'react';
import { 
  User, Package, MapPin, Scroll, LogOut, 
  Edit2, ChevronRight, Flame, Settings 
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { id: 'sankalp', label: 'My Sankalp Details', icon: <Flame size={18} /> },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={18} /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-heritage-parchment pb-20 pt-10 px-4 font-body">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-heading text-3xl font-bold text-heritage-charcoal">Namaste, Rahul</h1>
            <p className="text-heritage-grey text-sm">Member since Nov 2024 • <span className="text-heritage-rudraksha font-bold">Kashi Devotee</span></p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-heritage-rudraksha border border-heritage-rudraksha px-4 py-2 rounded hover:bg-heritage-rudraksha hover:text-white transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-lg text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-heritage-charcoal text-white shadow-md' 
                    : 'bg-white text-heritage-charcoal hover:bg-gray-50 border border-heritage-mist'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
                {activeTab === item.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-heading text-xl font-bold text-heritage-charcoal mb-4">Recent Orders</h2>
                {[1, 2].map((order) => (
                  <div key={order} className="bg-white p-6 rounded-xl border border-heritage-mist shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Delivered</span>
                        <h3 className="font-bold text-heritage-charcoal mt-2">5 Mukhi Rudraksha + Pyrite Bracelet</h3>
                        <p className="text-xs text-heritage-grey">Ordered on 12 Dec 2024</p>
                      </div>
                      <span className="font-heading font-bold text-lg text-heritage-rudraksha">₹1,499</span>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-heritage-mist">
                      <button className="text-xs font-bold text-heritage-charcoal hover:text-heritage-rudraksha transition-colors">View Details</button>
                      <button className="text-xs font-bold text-heritage-charcoal hover:text-heritage-rudraksha transition-colors">Download Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SANKALP DETAILS TAB (Unique Feature) */}
            {activeTab === 'sankalp' && (
              <div className="bg-white p-8 rounded-xl border border-heritage-mist shadow-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-heritage-parchment rounded-full border border-heritage-saffron">
                    <Scroll size={24} className="text-heritage-rudraksha" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-heritage-charcoal">Sankalp Information</h2>
                    <p className="text-xs text-heritage-grey">Used by our Pandits for your rituals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-heritage-grey uppercase">Gotra</label>
                    <input type="text" defaultValue="Kashyap" className="w-full p-3 border border-heritage-mist rounded bg-heritage-parchment/50 font-bold text-heritage-charcoal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-heritage-grey uppercase">Rashi (Zodiac)</label>
                    <select className="w-full p-3 border border-heritage-mist rounded bg-heritage-parchment/50 font-bold text-heritage-charcoal">
                      <option>Mesha (Aries)</option>
                      <option>Vrishabha (Taurus)</option>
                      {/* Add others */}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-heritage-grey uppercase">Nakshatra (Optional)</label>
                    <input type="text" placeholder="e.g. Rohini" className="w-full p-3 border border-heritage-mist rounded bg-heritage-parchment/50 font-bold text-heritage-charcoal" />
                  </div>
                </div>
                
                <button className="mt-8 px-6 py-3 bg-heritage-charcoal text-white text-sm font-bold rounded hover:bg-black transition-colors shadow-lg">
                  Save Sankalp Details
                </button>
              </div>
            )}

            {/* ADDRESS TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-heading text-xl font-bold text-heritage-charcoal mb-4">Saved Addresses</h2>
                <div className="bg-white p-6 rounded-xl border-2 border-heritage-rudraksha/20 shadow-sm relative">
                  <span className="absolute top-4 right-4 bg-heritage-parchment text-heritage-rudraksha text-[10px] font-bold px-2 py-1 rounded border border-heritage-rudraksha">DEFAULT</span>
                  <h3 className="font-bold text-heritage-charcoal mb-2">Home</h3>
                  <p className="text-sm text-heritage-grey leading-relaxed">
                    Rahul Sharma<br/>
                    B-402, Lotus Apartments, Godowlia<br/>
                    Varanasi, Uttar Pradesh - 221001<br/>
                    +91 9876543210
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-1 text-xs font-bold text-heritage-charcoal hover:text-heritage-rudraksha">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button className="text-xs font-bold text-alert-red hover:text-red-700">Delete</button>
                  </div>
                </div>
                
                <button className="w-full py-4 border-2 border-dashed border-heritage-mist rounded-xl text-heritage-grey font-bold text-sm hover:border-heritage-charcoal hover:text-heritage-charcoal transition-all">
                  + Add New Address
                </button>
              </div>
            )}

            {/* PROFILE SETTINGS TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white p-8 rounded-xl border border-heritage-mist shadow-sm animate-fade-in">
                <h2 className="font-heading text-xl font-bold text-heritage-charcoal mb-6">Personal Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-heritage-grey uppercase">First Name</label>
                      <input type="text" defaultValue="Rahul" className="w-full p-3 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-heritage-grey uppercase">Last Name</label>
                      <input type="text" defaultValue="Sharma" className="w-full p-3 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-heritage-grey uppercase">Email</label>
                    <input type="email" defaultValue="rahul@example.com" className="w-full p-3 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-heritage-grey uppercase">Phone</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full p-3 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none" />
                  </div>
                  <button className="mt-4 px-6 py-3 bg-heritage-charcoal text-white text-sm font-bold rounded hover:bg-black transition-colors shadow-lg">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;