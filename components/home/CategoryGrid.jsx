import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid = ({ images = {} }) => {
  const navigate = useNavigate();
  
  // DEFAULT FALLBACK IMAGES (In case Admin hasn't uploaded yet)
  const defaults = {
    saree: "https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=800",
    lehenga: "https://images.unsplash.com/photo-1583391726247-e29237d8612f?q=80&w=800",
    suit: "https://images.unsplash.com/photo-1621623194266-4b3664963684?q=80&w=800",
    dupatta: "https://images.unsplash.com/photo-1596472655431-8933b49ecb2d?q=80&w=800"
  };

  const categories = [
    { 
        title: "Benarasi Sarees", 
        link: "/shop?cat=saree", 
        img: images?.saree || defaults.saree,
        colSpan: "md:col-span-2", // Big Box (2 Columns)
        rowSpan: "md:row-span-2", // Big Box (2 Rows)
        priority: true
    },
    { 
        title: "Lehengas", 
        link: "/shop?cat=lehenga", 
        img: images?.lehenga || defaults.lehenga,
        colSpan: "md:col-span-1", 
        rowSpan: "md:row-span-1"
    },
    { 
        title: "Handloom Suits", 
        link: "/shop?cat=suit", 
        img: images?.suit || defaults.suit,
        colSpan: "md:col-span-1", 
        rowSpan: "md:row-span-1"
    },
    { 
        title: "Dupattas", 
        link: "/shop?cat=dupatta", 
        img: images?.dupatta || defaults.dupatta,
        colSpan: "md:col-span-2", // Wide Strip at bottom right
        rowSpan: "md:row-span-1"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-12 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">The Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-black">Shop by Category</h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[120vh]">
          {categories.map((cat) => (
            <div 
              key={cat.title} 
              onClick={() => navigate(cat.link)}
              className={`group relative overflow-hidden cursor-pointer ${cat.colSpan} ${cat.rowSpan} min-h-[300px]`}
            >
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                 <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-white font-serif text-3xl md:text-5xl italic mb-3 tracking-wide drop-shadow-md">
                        {cat.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] border-b border-transparent group-hover:border-white transition-all pb-1">
                            Explore
                        </span>
                        <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500" size={16} />
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};