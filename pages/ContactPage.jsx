import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-serif text-heritage-charcoal selection:bg-heritage-gold/20">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-heritage-gold mb-4 block">
            At Your Service
          </span>
          <h1 className="text-5xl md:text-6xl italic font-light text-heritage-charcoal">
            Get in Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* CONTACT INFO */}
          <div className="space-y-12">
            <div className="prose">
              <p className="font-sans text-lg text-gray-600 font-light leading-relaxed">
                Whether you wish to discuss a bespoke bridal commission, inquire about a shipment, or simply learn more about our weaving process, our concierge team is at your disposal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Visit Us */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-heritage-gold">
                  <MapPin size={20} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">Visit Us</span>
                </div>
                <p className="font-sans text-sm text-gray-600 leading-loose">
                  **Pahnawa Banaras Flagship**<br/>
                  B-21/108, Kamachha,<br/>
                  Bhelupur, Varanasi,<br/>
                  Uttar Pradesh 221010
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-heritage-gold">
                  <Phone size={20} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">Contact</span>
                </div>
                <div className="font-sans text-sm text-gray-600 space-y-2">
                  <p>+91 93054 91919</p>
                  <p>hello@pahnawabanaras.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-heritage-gold">
                  <Clock size={20} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">Hours</span>
                </div>
                <div className="font-sans text-sm text-gray-600 space-y-1">
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: By Appointment</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-heritage-gold">
                  <MessageCircle size={20} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-widest font-sans">Chat</span>
                </div>
                <p className="font-sans text-sm text-gray-600">
                  For instant styling advice, <br/>
                  <a href="https://wa.me/919305491919" className="underline hover:text-heritage-charcoal transition-colors">Message us on WhatsApp</a>
                </p>
              </div>

            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-[#FAF9F6] p-8 md:p-12 border border-gray-100">
            <h3 className="font-serif text-2xl italic mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                  <input type="text" className="w-full bg-white border border-gray-200 p-3 text-sm focus:border-heritage-gold outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                  <input type="text" className="w-full bg-white border border-gray-200 p-3 text-sm focus:border-heritage-gold outline-none transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-white border border-gray-200 p-3 text-sm focus:border-heritage-gold outline-none transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                <select className="w-full bg-white border border-gray-200 p-3 text-sm focus:border-heritage-gold outline-none transition-colors text-gray-600">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Bridal Consultation</option>
                  <option>Wholesale / Bulk</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                <textarea rows="4" className="w-full bg-white border border-gray-200 p-3 text-sm focus:border-heritage-gold outline-none transition-colors"></textarea>
              </div>

              <button className="w-full bg-heritage-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-gold transition-all duration-300">
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