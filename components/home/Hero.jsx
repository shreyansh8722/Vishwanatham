import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero1 from '../../assets/hero1.webp'; 
import hero2 from '../../assets/hero2.webp'; 
import hero3 from '../../assets/hero3.webp'; 

const slides = [
  {
    id: 1,
    image: hero1,
    subtitle: "Vedic purity • Kashi",
    title: "Awaken your inner divinity",
    desc: "Authentic Rudraksha and gemstones sourced directly from Varanasi.",
    positionClass: "justify-center items-center", 
    textAlignClass: "text-center",
    paddingClass: "px-6",
    overlayClass: "bg-black/40" 
  },
  {
    id: 2,
    image: hero2,
    subtitle: "100% lab certified",
    title: "The power of real Rudraksha",
    desc: "Rare beads energized with Vedic mantras for your spiritual growth.",
    positionClass: "justify-center items-start", 
    textAlignClass: "text-left",
    paddingClass: "px-6 md:pl-24",
    overlayClass: "bg-black/50"
  },
  {
    id: 3,
    image: hero3,
    subtitle: "Astrological grade",
    title: "Gemstones that shape destiny",
    desc: "Natural, untreated gemstones selected to harmonize planetary influences.",
    positionClass: "justify-center items-end", 
    textAlignClass: "text-right",
    paddingClass: "px-6 md:pr-24",
    overlayClass: "bg-black/50"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    // FIX: Using Viewport Height (vh) for consistent proportions on all devices
    <div className="relative w-full h-[60vh] md:h-[85vh] bg-heritage-charcoal overflow-hidden group">
      
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 ${slide.overlayClass}`} />

          {/* Content Container */}
          <div className={`absolute inset-0 flex flex-col ${slide.positionClass} ${slide.paddingClass}`}>
            <div className={`max-w-2xl w-full ${slide.textAlignClass}`}>
              
              <div key={index} className="animate-fade-up space-y-6">
                
                {/* Subtitle */}
                <div className={`inline-block border border-white/60 rounded px-4 py-1.5 backdrop-blur-sm ${
                    slide.textAlignClass === 'text-center' ? 'mx-auto' : 
                    slide.textAlignClass === 'text-right' ? 'ml-auto' : ''
                }`}>
                  <span className="text-white text-[13px] font-manrope font-medium tracking-wide">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-cinzel text-3xl md:text-6xl text-white font-semibold leading-[1.1] drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-white/95 font-manrope text-sm md:text-lg font-normal tracking-wide drop-shadow-md leading-relaxed max-w-lg">
                  {slide.desc}
                </p>

                {/* Buttons */}
                <div className={`flex flex-wrap gap-4 pt-4 ${
                  slide.textAlignClass === 'text-center' ? 'justify-center' : 
                  slide.textAlignClass === 'text-right' ? 'justify-end' : 'justify-start'
                }`}>
                  {/* Primary: Terracotta */}
                  <Link to="/shop">
                    <button className="bg-heritage-rudraksha text-white px-8 py-3 text-sm font-semibold rounded hover:bg-heritage-saffron transition-all shadow-xl border border-heritage-rudraksha">
                      Shop now
                    </button>
                  </Link>
                  {/* Secondary: White Outline */}
                  <Link to="/consult">
                    <button className="bg-transparent border border-white text-white px-8 py-3 text-sm font-semibold rounded hover:bg-white hover:text-heritage-charcoal transition-all backdrop-blur-sm">
                      Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Hidden on Mobile for cleaner look) */}
      <button 
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 border border-white/30 rounded text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 border border-white/30 rounded text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded transition-all duration-300 ${
              current === idx ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;