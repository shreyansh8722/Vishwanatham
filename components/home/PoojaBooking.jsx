import React from 'react';
import { Link } from 'react-router-dom';
import { Video, CheckCircle2, ArrowRight, Flame } from 'lucide-react';
import { useSiteAssets } from '../../hooks/useSiteAssets'; // Connected to Admin

const PoojaBooking = () => {
  const { getAsset } = useSiteAssets();

  // Fetch image from Admin -> Key: 'pooja_booking_bg'
  const featureImage = getAsset('pooja_booking_bg', 'https://placehold.co/800x600/e2e8f0/1e293b?text=Add+Pooja+Image');

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-center bg-black rounded-3xl overflow-hidden shadow-2xl">
           
           {/* Left: Dynamic Image from Admin */}
           <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative">
              <img 
                src={featureImage} 
                alt="Kashi Aarti" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:hidden"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-white text-xs font-bold uppercase tracking-wider">Live from Kashi</span>
              </div>
           </div>

           {/* Right: Content */}
           <div className="w-full md:w-1/2 p-8 md:p-16 text-white relative">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-20 blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                 <span className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Video size={12} /> Live Streaming Available
                 </span>
                 
                 <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Book a Ritual at <br/> <span className="text-yellow-400">Kashi Vishwanath</span>
                 </h2>
                 
                 <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                    Can't travel to Varanasi? Our Shastris will perform the puja in your name (Sankalp). Watch it live via video call and receive the energized Prasad at home.
                 </p>
                 
                 <ul className="space-y-4 mb-8">
                    {[
                      "Sankalp with Name & Gotra",
                      "HD Live Zoom/WhatsApp Call",
                      "Pandit Dakshina Included",
                      "Prasad & Bhabhuti Home Delivery"
                    ].map((item, i) => (
                       <li key={i} className="flex items-start gap-3 text-gray-200 text-sm font-medium">
                          <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                          {item}
                       </li>
                    ))}
                 </ul>
                 
                 <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/pooja-services">
                       <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          Book Pooja Slot <ArrowRight size={16} />
                       </button>
                    </Link>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};

export default PoojaBooking;