import React from 'react';
import { ShieldCheck, Truck, Gem } from 'lucide-react';

export const CraftSection = () => {
  return (
    <section className="py-16 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* 1. Authenticity */}
            <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#B08D55]/10 flex items-center justify-center text-[#B08D55] mb-6">
                    <ShieldCheck strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-2">Silk Mark Certified</h3>
                <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">
                    100% Pure Silk. Every product comes with an authenticity card.
                </p>
            </div>

            {/* 2. Direct Source */}
            <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#B08D55]/10 flex items-center justify-center text-[#B08D55] mb-6">
                    <Gem strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-2">Direct from Weavers</h3>
                <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">
                    Fair prices for you, fair wages for our artisans. No middlemen.
                </p>
            </div>

            {/* 3. Shipping */}
            <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#B08D55]/10 flex items-center justify-center text-[#B08D55] mb-6">
                    <Truck strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-2">Worldwide Shipping</h3>
                <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed">
                    Bringing the heritage of Banaras to your doorstep, anywhere in the world.
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};