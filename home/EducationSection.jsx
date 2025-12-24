import React from 'react';

export const EducationSection = () => (
  <section className="py-20 bg-heritage-sand">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="w-full md:w-1/2">
           <img 
             src="https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=1000" 
             alt="Spiritual Practice" 
             className="w-full h-[400px] object-cover rounded-sm shadow-xl"
           />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-gold mb-4 block">Ancient Wisdom</span>
           <h2 className="font-cormorant text-4xl md:text-5xl text-heritage-charcoal mb-6">Why Wear Rudraksha?</h2>
           <p className="font-montserrat text-gray-600 leading-relaxed mb-8 font-light">
             Rudraksha beads are not just jewelry; they are a shield. Historically worn by sages for clarity and protection, they are believed to create a cocoon of your own energy, protecting you from negative influences while traveling or meditating.
           </p>
           <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-cormorant text-xl mb-2">Clarity</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Sharpens Focus</p>
              </div>
              <div>
                <h4 className="font-cormorant text-xl mb-2">Protection</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Against Negativity</p>
              </div>
           </div>
           <button className="bg-heritage-charcoal text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">Read More</button>
        </div>
      </div>
    </div>
  </section>
);