import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Rudraksha",
      image: "https://images.unsplash.com/photo-1610385983272-3e2840679b3f?q=80&w=800&auto=format&fit=crop", // Replace with real image
      desc: "Seeds of Lord Shiva for Peace & Power"
    },
    {
      id: 2,
      title: "Gemstones",
      image: "https://images.unsplash.com/photo-1615485925694-a035aa05987d?q=80&w=800&auto=format&fit=crop",
      desc: "Planetary Alignment Crystals"
    },
    {
      id: 3,
      title: "Yantras",
      image: "https://images.unsplash.com/photo-1632519207886-21699902345e?q=80&w=800&auto=format&fit=crop",
      desc: "Geometric Geometries of Wealth"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <Link to="/shop" key={cat.id} className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-md">
          {/* Image */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
          <img 
            src={cat.image} 
            alt={cat.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-heading text-2xl font-bold text-white mb-1 group-hover:text-heritage-saffron transition-colors">
              {cat.title}
            </h3>
            <p className="text-gray-300 text-xs font-light tracking-wide mb-4">
              {cat.desc}
            </p>
            <span className="inline-block text-[10px] font-bold text-white border border-white/30 px-3 py-1 rounded uppercase tracking-widest group-hover:bg-heritage-rudraksha group-hover:border-heritage-rudraksha transition-all">
              Explore Collection
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCategories;