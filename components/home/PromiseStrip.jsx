import React from 'react';
import { Gem, Truck, ShieldCheck } from 'lucide-react';

export const PromiseStrip = () => {
  return (
    <div className="py-24 border-t border-gray-800 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
        <div className="px-4 pt-8 md:pt-0 group">
           <div className="mb-4 flex justify-center text-gray-500 group-hover:text-[#B08D55] transition-colors">
             <Gem size={24} strokeWidth={1} />
           </div>
           <h4 className="font-serif text-xl mb-2">Silk Mark Certified</h4>
           <p className="text-xs text-gray-500 uppercase tracking-widest">Guaranteed Pure Silk</p>
        </div>
        <div className="px-4 pt-8 md:pt-0 group">
           <div className="mb-4 flex justify-center text-gray-500 group-hover:text-[#B08D55] transition-colors">
             <Truck size={24} strokeWidth={1} />
           </div>
           <h4 className="font-serif text-xl mb-2">Ready to Ship</h4>
           <p className="text-xs text-gray-500 uppercase tracking-widest">Dispatched within 24 Hours</p>
        </div>
        <div className="px-4 pt-8 md:pt-0 group">
           <div className="mb-4 flex justify-center text-gray-500 group-hover:text-[#B08D55] transition-colors">
             <ShieldCheck size={24} strokeWidth={1} />
           </div>
           <h4 className="font-serif text-xl mb-2">Authentic Sourcing</h4>
           <p className="text-xs text-gray-500 uppercase tracking-widest">Direct from Varanasi</p>
        </div>
      </div>
    </div>
  );
};