import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Users } from 'lucide-react';

export const SadhanaChallenge = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-heritage-terracotta relative overflow-hidden text-white">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none"/></svg>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left: Content */}
        <div className="md:w-1/2 text-center md:text-left animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
            <Users size={14} /> <span>Join 12,000+ Seekers</span>
          </div>
          
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold mb-6">
            The 21-Day <br/>
            <span className="text-heritage-gold">Jaap Challenge</span>
          </h2>
          
          <p className="text-white/90 text-lg font-manrope mb-8 leading-relaxed">
            Habits build destiny. Commit to just 10 minutes of mantra chanting daily for 21 days using your Rudraksha. 
            Feel the difference in your anxiety levels and focus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-white text-heritage-terracotta px-8 py-4 font-cinzel font-bold rounded shadow-xl hover:bg-heritage-gold hover:text-heritage-rudraksha transition-all">
              Join the Challenge (Free)
            </button>
            <Link to="/how-to-meditate" className="px-8 py-4 border border-white/30 rounded font-manrope font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Calendar size={18} /> How it works
            </Link>
          </div>
        </div>

        {/* Right: Visual Checklist */}
        <div className="md:w-1/2 w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl animate-fade-up" style={{animationDelay: '0.2s'}}>
          <h3 className="font-cinzel text-xl font-bold mb-6 border-b border-white/20 pb-4">Daily Sadhana Tracker</h3>
          <div className="space-y-4 font-manrope">
            {[
              "Wake up before sunrise (Brahma Muhurta)",
              "Wear your Rudraksha / Mala",
              "Chant 'Om Namah Shivaya' 108 times",
              "Sit in silence for 5 minutes"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-heritage-gold flex items-center justify-center group-hover:bg-heritage-gold transition-colors">
                  <CheckCircle2 size={14} className="opacity-0 group-hover:opacity-100 text-heritage-rudraksha" />
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
             <p className="text-xs text-heritage-gold uppercase tracking-widest font-bold">Start your streak today</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SadhanaChallenge;