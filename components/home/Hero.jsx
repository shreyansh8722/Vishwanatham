import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- DIRECT ASSET IMPORTS ---
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp';

const SLIDES = [
  { id: 1, image: hero1 },
  { id: 2, image: hero2 },
  { id: 3, image: hero3 }
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Rotation Timer (7 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* --- BACKGROUND IMAGES --- */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Ken Burns Scale Effect */}
          <div className={`w-full h-full transform transition-transform duration-[10000ms] ease-linear ${
             index === currentIndex ? "scale-110" : "scale-100"
          }`}>
             <img
                src={slide.image}
                alt="Hero Slide"
                className="w-full h-full object-cover opacity-90"
                loading={index === 0 ? "eager" : "lazy"} 
             />
          </div>
          {/* Subtle Gradient just for depth (Optional - remove if you want 100% pure image) */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* --- PROGRESS BARS (Only visual element left) --- */}
      <div className="absolute bottom-10 left-6 md:left-20 z-30 flex gap-4">
        {SLIDES.map((_, idx) => (
          <div 
            key={idx} 
            className="h-[2px] w-12 bg-white/20 overflow-hidden rounded-full cursor-pointer"
            onClick={() => setCurrentIndex(idx)}
          >
            <div 
              className={`h-full bg-white transition-all duration-[7000ms] linear ${
                idx === currentIndex ? "w-full" : "w-0 opacity-0"
              }`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};