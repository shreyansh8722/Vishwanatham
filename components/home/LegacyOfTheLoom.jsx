import React from 'react';

export const LegacyOfTheLoom = () => {
  return (
    <section className="py-12 md:py-24 bg-[#111] text-white">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row-reverse">
        <div className="flex-1 px-8 md:px-24 py-16 md:py-24 flex flex-col justify-center border-l border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B08D55] mb-6">The Source</span>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
            Direct from <br/> the Master Weavers.
          </h2>
          <p className="text-white/60 font-light leading-relaxed max-w-md mb-12">
            Every saree in our collection is a finished masterpiece, personally selected from the looms of Varanasi's most skilled artisans. We bridge the gap between the ancient lanes of Banaras and your wardrobe.
          </p>
          <div>
            <button className="text-xs font-bold uppercase tracking-[0.25em] border-b border-white/30 pb-2 hover:text-[#B08D55] hover:border-[#B08D55] transition-colors">
              Discover Our Story
            </button>
          </div>
        </div>
        <div className="flex-1 relative h-[50vh] md:h-auto">
           <img src="https://images.unsplash.com/photo-1606744888123-2479e4362143?q=80&w=1200" alt="Varanasi Weaver" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </section>
  );
};