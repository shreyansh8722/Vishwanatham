import React from 'react';
import { Star } from 'lucide-react';

export const Narrative = () => {
  return (
    <section className="py-24 md:py-36 bg-[#FAF9F6] px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <Star size={16} className="text-[#B08D55] fill-current" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-8">
          "Curated excellence from <br/> the heart of <span className="italic text-[#B08D55]">Varanasi</span>."
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light tracking-wide">
          We source directly from the master weavers of Banaras. Each piece in our collection is already woven, quality-checked, and waiting to be part of your legacy. No waiting times, just pure, authentic heritage delivered to your doorstep.
        </p>
        <div className="mt-12">
          <div className="h-16 w-[1px] bg-[#B08D55]/30 mx-auto" />
        </div>
      </div>
    </section>
  );
};