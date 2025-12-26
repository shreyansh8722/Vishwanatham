/* shreyansh8722/vishwanatham/Vishwanatham-2348871e510016e627219d73c9bd6b32f3b7c3af/components/home/Hero.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/hero1.webp'; 

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] bg-gray-50 overflow-hidden">
      {/* Full Width Image 
        object-cover ensures it fills the space. 
        If the image text is 'safe-zoned' for mobile, object-center works well.
      */}
      <img 
        src={hero1} 
        alt="Vishwanatham Collection" 
        className="w-full h-full object-cover object-center"
      />

      {/* Clean Floating Button 
        Positioned at bottom center.
        Glassmorphism effect or Solid White/Red for contrast.
      */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-10">
        <Link to="/shop">
           <button className="bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-body font-medium tracking-widest uppercase text-sm shadow-xl rounded-sm">
             Shop Collection
           </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;