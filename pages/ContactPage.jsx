import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-heritage-paper font-body text-heritage-charcoal">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20 animate-fade-up">
          <span className="text-xs font-bold font-body uppercase tracking-[0.2em] text-heritage-gold mb-3 block">
            At Your Service
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-heritage-charcoal">
            Get in Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fade-up">
          
          {/* INFO */}
          <div className="space-y-12">
            <p className="text-lg text-heritage-grey font-light leading-relaxed">
              Whether you wish to discuss a bespoke commission, inquire about a shipment, or learn more about our process, our concierge team is at your disposal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-heritage-rudraksha">
                  <MapPin size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Visit Us</span>
                </div>
                <p className="text-sm text-heritage-grey leading-loose">
                  B-21/108, Kamachha,<br/>
                  Bhelupur, Varanasi,<br/>
                  Uttar Pradesh 221010
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-heritage-rudraksha">
                  <Phone size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Contact</span>
                </div>
                <div className="text-sm text-heritage-grey space-y-1">
                  <p>+91 93054 91919</p>
                  <p>hello@vishwanatham.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 md:p-12 border border-heritage-mist shadow-sm">
            <h3 className="font-heading text-2xl mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">First Name</label>
                  <input type="text" className="w-full border-b border-heritage-mist py-2 text-sm focus:border-heritage-rudraksha outline-none bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Last Name</label>
                  <input type="text" className="w-full border-b border-heritage-mist py-2 text-sm focus:border-heritage-rudraksha outline-none bg-transparent" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Email</label>
                <input type="email" className="w-full border-b border-heritage-mist py-2 text-sm focus:border-heritage-rudraksha outline-none bg-transparent" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-heritage-grey">Message</label>
                <textarea rows="4" className="w-full border-b border-heritage-mist py-2 text-sm focus:border-heritage-rudraksha outline-none bg-transparent"></textarea>
              </div>

              <button className="w-full bg-heritage-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-rudraksha transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}