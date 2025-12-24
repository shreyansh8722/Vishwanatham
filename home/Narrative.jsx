import React from 'react';
import { Sparkles } from 'lucide-react';

export const Narrative = () => {
  return (
    <section className="py-20 px-4 bg-heritage-paper text-center">
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="flex justify-center mb-6">
           <Sparkles className="text-heritage-gold w-8 h-8 opacity-80" />
        </div>
        
        <h2 className="font-cinzel text-3xl md:text-5xl text-heritage-charcoal mb-8 leading-tight">
          We don't just sell beads. <br/>
          <span className="text-heritage-terracotta italic">We deliver blessings.</span>
        </h2>
        
        <div className="space-y-6 font-manrope text-lg text-heritage-grey leading-relaxed">
          <p>
            In the noise of the modern world, finding <strong>Sukoon</strong> (Inner Peace) feels impossible. 
            You are constantly running, achieving, and worrying.
          </p>
          <p>
            At Vishwanatham, we believe peace isn't a destination—it's something you carry with you. 
            Every Rudraksha we source is not just a botanical seed; it is a silence amidst the noise, 
            energized on the holy Ghats of Kashi to help you return to your center.
          </p>
        </div>

        <div className="mt-12">
           <p className="font-cinzel font-bold text-sm tracking-widest text-heritage-terracotta uppercase">
             Your Journey to Peace Begins Here
           </p>
           <div className="w-16 h-0.5 bg-heritage-terracotta/30 mx-auto mt-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Narrative;