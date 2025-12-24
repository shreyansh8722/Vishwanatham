import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Users, Flame } from 'lucide-react';

const SadhanaChallenge = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      
      {/* 1. Background Image with Divine Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2099&auto=format&fit=crop" 
          alt="Meditation Atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-heritage-charcoal via-heritage-charcoal/90 to-heritage-rudraksha/80"></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Inspiring Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-heritage-saffron/20 backdrop-blur-md border border-heritage-saffron/30 px-4 py-1.5 rounded-full text-xs font-bold text-heritage-saffron uppercase tracking-widest mb-6 animate-fade-in">
            <Users size={14} /> <span>Join 12,000+ Seekers</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The 21-Day <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-heritage-saffron to-amber-300">
              Sadhana Challenge
            </span>
          </h2>
          
          <p className="text-gray-200 text-lg font-body mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Habits build destiny. Commit to just <strong>10 minutes</strong> of mantra chanting daily. 
            Align your vibration with the cosmic energy of Shiva.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-heritage-saffron text-heritage-charcoal px-8 py-4 font-heading font-bold rounded-lg shadow-[0_0_20px_rgba(255,222,89,0.3)] hover:bg-white transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              <Flame size={18} className="fill-heritage-charcoal" /> Join for Free
            </button>
            <Link to="/how-to-meditate" className="px-8 py-4 border border-white/30 rounded-lg font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
              <Calendar size={18} /> How it works
            </Link>
          </div>
        </div>

        {/* Right: Glassmorphic Tracker Card */}
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
               <h3 className="font-heading text-xl font-bold text-white">Daily Ritual Tracker</h3>
               <span className="text-xs font-bold bg-alert-green text-white px-2 py-1 rounded">Day 1</span>
            </div>
            
            <div className="space-y-5 font-body">
              {[
                { text: "Wake up in Brahma Muhurta", time: "4:30 AM" },
                { text: "Wear your Rudraksha Mala", time: "All Day" },
                { text: "Chant 'Om Namah Shivaya' 108x", time: "10 Mins" },
                { text: "Sit in Silence (Dhyana)", time: "5 Mins" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${idx === 0 ? 'bg-heritage-saffron border-heritage-saffron' : 'border-white/40 group-hover:border-heritage-saffron'}`}>
                    {idx === 0 && <CheckCircle2 size={14} className="text-heritage-charcoal" />}
                  </div>
                  <div className="flex-1">
                     <span className={`block text-sm font-bold ${idx === 0 ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{item.text}</span>
                     <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10 text-center">
               <p className="text-xs text-heritage-saffron uppercase tracking-widest font-bold animate-pulse">Start your streak today</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SadhanaChallenge;