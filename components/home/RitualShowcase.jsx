import React from 'react';
import { Play } from 'lucide-react';

const RitualShowcase = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-white border-y border-heritage-mist">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Side */}
          <div className="md:w-1/2 animate-fade-up">
            <span className="text-heritage-rudraksha font-bold tracking-[0.2em] uppercase text-xs block mb-3">
              Authenticity You Can Witness
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-heritage-charcoal font-bold mb-6">
              Prana Pratishta <br/>
              <span className="text-heritage-olive text-2xl md:text-4xl font-normal italic">The Energization Ritual</span>
            </h2>
            <p className="text-heritage-grey font-body text-lg mb-6 leading-relaxed">
              A Rudraksha without life is just a seed. Before it reaches you, every bead undergoes a rigorous 
              <strong> Vedic Poojan</strong> at the Kashi Vishwanath temple ghats by learned pundits.
            </p>
            
            <ul className="space-y-4 mb-8 text-heritage-charcoal">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-heritage-rudraksha rounded-full"></span>
                Gangajal Abhishekam (Cleansing)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-heritage-rudraksha rounded-full"></span>
                Mantra Chanting (Energizing)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-heritage-rudraksha rounded-full"></span>
                Sandalwood & Flower Offering (Blessing)
              </li>
            </ul>

            <button className="text-heritage-rudraksha font-bold border-b-2 border-heritage-rudraksha pb-1 hover:text-heritage-crimson transition-colors uppercase tracking-widest text-sm">
              Read about our Process &rarr;
            </button>
          </div>

          {/* Video Placeholder Side */}
          <div className="md:w-1/2 w-full animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="relative aspect-video bg-heritage-charcoal rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-heritage-parchment">
              {/* Replace with actual thumbnail of a Pundit/Ritual */}
              <img 
                src="https://images.unsplash.com/photo-1604928172322-9213fb385202?q=80&w=1600" 
                alt="Vedic Ritual in Kashi" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                  <Play className="fill-white text-white ml-1" size={24} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                Watch the Vidhi
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RitualShowcase;