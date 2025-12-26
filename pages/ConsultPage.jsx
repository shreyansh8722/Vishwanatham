import React, { useState } from 'react';
import { Search, Star, MessageCircle, Phone, Video, Filter, ChevronDown, Clock } from 'lucide-react';

const EXPERTS = [
  {
    id: 1,
    name: "Pt. Ram Krishna",
    skills: ["Vedic", "Vastu", "Face Reading"],
    languages: ["Hindi", "English", "Sanskrit"],
    exp: 15,
    rating: 4.9,
    reviews: 2341,
    price: 25,
    isOnline: true,
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  {
    id: 2,
    name: "Tarot Aisha",
    skills: ["Tarot", "Reiki", "Crystal Healing"],
    languages: ["English", "Hindi"],
    exp: 7,
    rating: 4.8,
    reviews: 890,
    price: 18,
    isOnline: false,
    nextAvailable: "2:00 PM",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Acharya Dipak",
    skills: ["Numerology", "Palmistry"],
    languages: ["Hindi", "Gujarati"],
    exp: 22,
    rating: 5.0,
    reviews: 4100,
    price: 45,
    isOnline: true,
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  }
];

const ConsultPage = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-heritage-parchment/30 pb-24 font-body text-heritage-charcoal">
      
      {/* 1. HERO HEADER */}
      <div className="bg-white border-b border-heritage-mist sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div>
                <h1 className="font-heading text-2xl font-bold text-heritage-charcoal">Talk to Astrologers</h1>
                <p className="text-xs text-heritage-grey">First consultation FREE for new users</p>
             </div>
             
             {/* Search & Wallet */}
             <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                   <input 
                     type="text" 
                     placeholder="Search by name or skill..." 
                     className="w-full pl-9 pr-4 py-2.5 bg-heritage-parchment border border-heritage-mist rounded-full text-sm focus:outline-none focus:border-heritage-rudraksha focus:ring-1 focus:ring-heritage-rudraksha transition-all"
                   />
                </div>
                <div className="px-4 py-2 border border-heritage-gold/30 rounded-full text-sm font-bold text-heritage-gold bg-heritage-saffron/20 whitespace-nowrap shadow-sm">
                   ₹ 0.00
                </div>
             </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
             {['All', 'Vedic', 'Tarot', 'Numerology', 'Vastu', 'Love', 'Career'].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-heritage-charcoal text-white shadow-md' : 'bg-white border border-heritage-mist text-heritage-grey hover:border-heritage-charcoal'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* 2. EXPERT GRID */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {EXPERTS.map(expert => (
             <div key={expert.id} className="bg-white rounded-2xl p-5 border border-heritage-mist hover:shadow-lg transition-shadow relative overflow-hidden group">
                
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-10">
                   {expert.isOnline ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 shadow-sm">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE
                      </span>
                   ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                         <Clock size={10} /> {expert.nextAvailable || "BUSY"}
                      </span>
                   )}
                </div>

                <div className="flex gap-4">
                   <div className="relative">
                      <div className="w-16 h-16 rounded-full p-0.5 border-2 border-heritage-gold overflow-hidden">
                         <img src={expert.image} alt={expert.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-heritage-mist whitespace-nowrap">
                         <Star size={8} className="text-heritage-gold fill-current" /> {expert.rating}
                      </div>
                   </div>
                   
                   <div>
                      <h3 className="font-heading font-bold text-lg leading-tight text-heritage-charcoal">{expert.name}</h3>
                      <p className="text-xs text-heritage-grey line-clamp-1 mt-1">{expert.skills.join(', ')}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{expert.languages.join(', ')}</p>
                      <p className="text-xs font-bold text-heritage-charcoal mt-2 bg-heritage-parchment px-2 py-0.5 rounded inline-block">
                         {expert.exp} Years Exp.
                      </p>
                   </div>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-5 pt-4 border-t border-heritage-mist flex items-center justify-between gap-3">
                   <div className="text-center">
                      <p className="text-lg font-bold text-heritage-charcoal">₹{expert.price}<span className="text-[10px] font-normal text-gray-400">/min</span></p>
                      {expert.price > 20 && <p className="text-[9px] text-green-600 font-bold">First 3 min FREE</p>}
                   </div>
                   
                   <div className="flex gap-2 flex-1 justify-end">
                      <button className="flex-1 flex items-center justify-center gap-1.5 border border-heritage-mist py-2.5 rounded-xl text-xs font-bold text-heritage-charcoal hover:bg-heritage-parchment transition-colors">
                         <MessageCircle size={16} /> Chat
                      </button>
                      <button className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors shadow-sm ${expert.isOnline ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}>
                         <Phone size={16} /> Call
                      </button>
                   </div>
                </div>

             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultPage;