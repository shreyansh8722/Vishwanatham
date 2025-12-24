import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Award } from 'lucide-react';
import hero1 from '../../assets/hero1.webp'; // Ensure this is the lifestyle shot mentioned in [cite: 411]

const Hero = () => {
  return (
    // Layout: Split Screen (50/50) on Desktop, Stacked on Mobile 
    <section className="relative w-full min-h-[85vh] flex flex-col md:flex-row bg-heritage-parchment">
      
      {/* LEFT SIDE: Narrative [cite: 400] */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 order-2 md:order-1">
        <div className="animate-fade-up space-y-6">
          
          {/* Headline: Playfair Display, Ebony  */}
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-heritage-ebony leading-[1.15]">
            Align Your Stars, <br/>
            <span className="italic text-heritage-crimson">Adorn Your Soul.</span>
          </h1>

          {/* Subhead: Roboto [cite: 403] */}
          <p className="font-body text-lg text-heritage-ebony/80 max-w-lg leading-relaxed">
            India's most trusted source for Lab-Certified Spiritual Wearables & Vedic Guidance. Bridge the gap between ancient wisdom and modern life.
          </p>

          {/* Trust Markers  */}
          <div className="flex items-center gap-6 py-2 text-sm font-medium text-heritage-grey">
            <div className="flex items-center gap-1.5"><ShieldCheck size={18} className="text-heritage-olive"/> ISO 9001 Certified</div>
            <div className="flex items-center gap-1.5"><Award size={18} className="text-heritage-olive"/> 15 Lakh+ Happy Users</div>
          </div>

          {/* CTAs [cite: 405-407] */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Button 1: Vedic Crimson */}
            <Link to="/shop">
              <button className="w-full sm:w-auto bg-heritage-crimson text-white px-8 py-3.5 text-base font-bold font-body rounded hover:bg-red-800 transition-colors shadow-lg">
                Shop Collection
              </button>
            </Link>
            
            {/* Button 2: Olive Prosperity (Ghost) */}
            <Link to="/consult">
              <button className="w-full sm:w-auto border-2 border-heritage-olive text-heritage-olive px-8 py-3.5 text-base font-bold font-body rounded hover:bg-heritage-olive hover:text-white transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Chat with Astrologer
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Imagery [cite: 410] */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-1 md:order-2 overflow-hidden">
        <img
          src={hero1}
          alt="Meditation with Rudraksha"
          className="w-full h-full object-cover"
        />
        {/* Overlay Element: Glassmorphism Review [cite: 413] */}
        <div className="absolute bottom-10 left-10 right-10 md:right-auto md:max-w-sm bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-lg shadow-xl animate-fade-in">
           <div className="flex gap-1 text-[#FFC107] mb-1">★★★★★</div>
           <p className="text-white font-medium italic">"The energy changed my life. Genuine products."</p>
           <p className="text-white/80 text-xs mt-2">- Priya, Mumbai</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;