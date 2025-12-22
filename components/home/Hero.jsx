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
    subtitle: "Vedic purity from Kashi",
    title: "Awaken your Inner Divinity",
    desc: "Authentic Rudraksha and gemstones sourced directly from the ghats of Varanasi.",
    positionClass: "justify-center items-center", 
    textAlignClass: "text-center",
    overlayClass: "bg-black/30" 
  },
  {
    id: 2,
    image: hero2,
    subtitle: "100% Lab Certified",
    title: "The Power of Real Rudraksha",
    desc: "Rare beads energized with Vedic mantras for your spiritual growth.",
    positionClass: "justify-center items-start", 
    textAlignClass: "text-left",
    overlayClass: "bg-black/40"
  },
  {
    id: 3,
    image: hero3,
    subtitle: "Astrological Grade",
    title: "Gemstones that Shape Destiny",
    desc: "Natural, untreated gemstones selected to harmonize planetary influences.",
    positionClass: "justify-center items-end", 
    textAlignClass: "text-right",
    overlayClass: "bg-black/40"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] bg-heritage-charcoal overflow-hidden group">
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${slide.overlayClass}`} />

          <div className={`absolute inset-0 flex flex-col ${slide.positionClass} px-6 md:px-16`}>
            <div className={`max-w-3xl w-full ${slide.textAlignClass}`}>
              <div key={index} className="animate-fade-up space-y-5">
                
                {/* Creative Accent - Okay to be Serif Italic */}
                <p className="text-white/90 text-lg md:text-xl font-heading italic tracking-wide">
                  {slide.subtitle}
                </p>

                {/* Main Heading - Creative Serif */}
                <h1 className="font-heading text-5xl md:text-7xl text-white leading-[1.1] drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description - FUNCTIONAL SANS SERIF */}
                <p className="text-white/90 font-manrope text-base md:text-lg font-medium tracking-wide mt-2 max-w-xl leading-relaxed mx-auto md:mx-0">
                  {slide.desc}
                </p>

                {/* Button - HIGH VISIBILITY SANS SERIF */}
                <div className={`flex flex-wrap gap-4 pt-6 ${
                  slide.textAlignClass === 'text-center' ? 'justify-center' : 
                  slide.textAlignClass === 'text-right' ? 'justify-end' : 'justify-start'
                }`}>
                  <Link to="/shop">
                    <button className="bg-white text-heritage-rudraksha px-8 py-3.5 text-sm font-bold font-manrope uppercase tracking-widest hover:bg-heritage-gold hover:text-white transition-all shadow-xl">
                      Shop Collection
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Nav Buttons */}
      <div className="hidden md:flex absolute bottom-10 right-10 z-20 gap-3">
        <button onClick={prevSlide} className="p-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors"><ChevronLeft size={20}/></button>
        <button onClick={nextSlide} className="p-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

export default Hero;