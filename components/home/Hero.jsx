import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp';

const images = [hero1, hero2, hero3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // UPDATED HEIGHTS:
    // h-[40vh]: On mobile, shorter height (landscape aspect) to avoid vertical stretching.
    // md:h-[calc(100vh-5rem)]: On laptop, fills the screen perfectly minus the navbar.
    <div className="relative w-full overflow-hidden bg-heritage-charcoal h-[40vh] md:h-[calc(100vh-5rem)] transition-all duration-300">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Centered Button */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <Link to="/shop">
          <button className="bg-white text-heritage-charcoal px-8 py-3 md:px-14 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] hover:bg-heritage-gold hover:text-white transition-all duration-300 shadow-xl border border-white">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Minimal Indicators (Adjusted for smaller mobile height) */}
      <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3 md:gap-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-[2px] transition-all duration-300 ${
              current === idx ? 'w-8 md:w-10 bg-white' : 'w-4 md:w-5 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;