import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Rudraksha', image: 'https://via.placeholder.com/150', link: '/shop?category=Rudraksha' },
  { name: 'Gemstones', image: 'https://via.placeholder.com/150', link: '/shop?category=Crystals' },
  { name: 'Malas', image: 'https://via.placeholder.com/150', link: '/shop?category=Mala' },
  { name: 'Bracelets', image: 'https://via.placeholder.com/150', link: '/shop?category=Bracelet' },
  { name: 'Yantras', image: 'https://via.placeholder.com/150', link: '/shop?category=Yantra' },
  { name: 'Idols', image: 'https://via.placeholder.com/150', link: '/shop?category=Idol' },
];

const FeaturedCategories = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
      {categories.map((cat, idx) => (
        <Link key={idx} to={cat.link} className="group flex flex-col items-center gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all group-hover:border-primary/30">
            {/* Replace src with actual category images */}
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="font-body font-medium text-sm text-gray-800 group-hover:text-primary uppercase tracking-wide">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCategories;