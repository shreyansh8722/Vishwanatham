import React from 'react';

export const MuseSection = ({ images = {} }) => {
  // Fallback images
  const defaultMuses = [
    "https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=600",
    "https://images.unsplash.com/photo-1596472655431-8933b49ecb2d?q=80&w=600",
    "https://images.unsplash.com/photo-1583391726247-e29237d8612f?q=80&w=600",
    "https://images.unsplash.com/photo-1621623194266-4b3664963684?q=80&w=600"
  ];

  // Merge admin images with defaults
  const displayImages = [
    images?.image1 || defaultMuses[0],
    images?.image2 || defaultMuses[1],
    images?.image3 || defaultMuses[2],
    images?.image4 || defaultMuses[3],
  ];

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-2">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2 block">Community</span>
                <h2 className="font-serif text-4xl text-black">Spotted in Pehnawa</h2>
            </div>
            <a href="https://instagram.com" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-[#B08D55] mt-6 md:mt-0">@PehnawaBanaras</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayImages.map((src, i) => (
                <div key={i} className="group relative aspect-[3/4] overflow-hidden bg-gray-200 cursor-pointer">
                    <img src={src} alt="Muse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-serif italic text-2xl">Shop Look</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};