import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo'; 
import { CheckCircle2, Zap, Truck, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-heritage-paper border-t border-heritage-mist pt-16 font-body">
      
      {/* --- TRUST STRIP (Minimalist) --- */}
      <div className="container mx-auto px-6 pb-12 border-b border-heritage-mist">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: CheckCircle2, title: "100% Original", desc: "Lab Certified" },
            { icon: Zap, title: "Energized", desc: "In Kashi Temple" },
            { icon: Truck, title: "Global Shipping", desc: "Express Delivery" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% Safe" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2 group">
              <item.icon className="w-6 h-6 text-heritage-rudraksha group-hover:text-heritage-saffron transition-colors" strokeWidth={1.5} />
              <h4 className="font-heading text-lg font-semibold text-heritage-charcoal">{item.title}</h4>
              <p className="text-xs text-heritage-grey font-medium uppercase tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand & Bio */}
          <div className="md:col-span-1 space-y-6">
            <Link to="/">
              <BrandLogo className="text-heritage-rudraksha scale-90 origin-left" />
            </Link>
            <p className="text-sm leading-relaxed text-heritage-grey font-medium">
              Connecting you to the spiritual heritage of Varanasi. Authentic Rudraksha, gemstones, and ancient wisdom for the modern seeker.
            </p>
          </div>
          
          {/* Links: Headings are Serif, Links are Sans-Serif */}
          <div>
            <h4 className="font-heading text-xl font-medium mb-6 text-heritage-rudraksha">Collections</h4>
            <ul className="space-y-3 text-sm text-heritage-grey font-medium">
              <li><Link to="/shop?category=Rudraksha" className="hover:text-heritage-saffron transition-colors">Rudraksha Beads</Link></li>
              <li><Link to="/shop?category=Gemstones" className="hover:text-heritage-saffron transition-colors">Vedic Gemstones</Link></li>
              <li><Link to="/shop?category=Yantras" className="hover:text-heritage-saffron transition-colors">Copper Yantras</Link></li>
              <li><Link to="/shop?category=Malas" className="hover:text-heritage-saffron transition-colors">Japa Malas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-medium mb-6 text-heritage-rudraksha">Support</h4>
            <ul className="space-y-3 text-sm text-heritage-grey font-medium">
              <li><Link to="/about" className="hover:text-heritage-saffron transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-heritage-saffron transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-heritage-saffron transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-heritage-saffron transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-xl font-medium mb-6 text-heritage-rudraksha">Join the Circle</h4>
            <p className="text-sm text-heritage-grey mb-4">Receive spiritual insights and exclusive offers from Kashi.</p>
            <div className="flex border-b border-heritage-grey/30 pb-2 focus-within:border-heritage-rudraksha transition-colors">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-heritage-charcoal font-body"
              />
              <button className="text-xs font-bold text-heritage-rudraksha hover:text-heritage-saffron uppercase tracking-wider transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-heritage-mist pt-10 mt-10 gap-4">
          <p className="text-xs text-heritage-grey font-medium">
            © 2025 Vishwanatham. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-heritage-grey font-bold uppercase tracking-wider">
             <Link to="/privacy" className="hover:text-heritage-rudraksha">Privacy</Link>
             <Link to="/terms" className="hover:text-heritage-rudraksha">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;