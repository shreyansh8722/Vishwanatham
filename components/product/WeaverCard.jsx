import React from 'react';
import { Clock, MapPin, ShieldCheck } from 'lucide-react';

export const WeaverCard = ({ 
  weaverName = "Master Weaver Ahmed", 
  location = "Bajardiha, Varanasi", 
  loomTime = "18 Days" 
}) => {
  return (
    <div className="bg-heritage-sand/40 border border-heritage-border p-6 rounded-sm my-8">
      <div className="flex items-center gap-4 mb-4">
        {/* Placeholder for Weaver Profile - encourages trust */}
        <div className="w-12 h-12 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold font-serif text-xl">
          {weaverName.charAt(0)}
        </div>
        <div>
          <h4 className="font-serif text-lg text-heritage-charcoal leading-none">{weaverName}</h4>
          <span className="text-xs text-gray-500 font-sans">Handloom Artisan</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-heritage-border/50">
        <div className="text-center">
          <Clock size={16} className="mx-auto mb-1 text-heritage-gold" strokeWidth={1.5}/>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Weave Time</p>
          <p className="font-serif text-md">{loomTime}</p>
        </div>
        <div className="text-center border-l border-r border-heritage-border/50">
          <ShieldCheck size={16} className="mx-auto mb-1 text-heritage-gold" strokeWidth={1.5}/>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Purity</p>
          <p className="font-serif text-md">Silk Mark</p>
        </div>
        <div className="text-center">
          <MapPin size={16} className="mx-auto mb-1 text-heritage-gold" strokeWidth={1.5}/>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Origin</p>
          <p className="font-serif text-md">Varanasi</p>
        </div>
      </div>
    </div>
  );
};