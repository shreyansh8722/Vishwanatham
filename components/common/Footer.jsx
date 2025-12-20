import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo'; 
import { CheckCircle2, Zap, Truck, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-heritage-paper border-t border-heritage-mist font-manrope pt-16">
      
      {/* --- TRUST STRIP --- */}
      <div className="container mx-auto px-6 pb-12 border-b border-heritage-mist">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: CheckCircle2, title: "100% Original", desc: "Lab certified" },
            { icon: Zap, title: "Energized", desc: "In Kashi temple" },
            { icon: Truck, title: "Express shipping", desc: "Worldwide delivery" },
            { icon: ShieldCheck, title: "Secure payment", desc: "100% Safe" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <item.icon className="w-6 h-6 text-heritage-saffron" strokeWidth={1.5} />
              <h4 className="font-cinzel text-lg font-semibold text-heritage-charcoal">{item.title}</h4>
              <p className="text-sm text-heritage-grey">{item.desc}</p>
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
          
          {/* Links */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-6 text-heritage-rudraksha">Shop</h4>
            <ul className="space-y-3 text-sm text-heritage-grey">
              <li><Link to="/shop?category=Rudraksha" className="hover:text-heritage-saffron transition-colors">Rudraksha</Link></li>
              <li><Link to="/shop?category=Gemstones" className="hover:text-heritage-saffron transition-colors">Gemstones</Link></li>
              <li><Link to="/shop?category=Yantras" className="hover:text-heritage-saffron transition-colors">Yantras</Link></li>
              <li><Link to="/shop?category=Malas" className="hover:text-heritage-saffron transition-colors">Japa malas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-6 text-heritage-rudraksha">Support</h4>
            <ul className="space-y-3 text-sm text-heritage-grey">
              <li><Link to="/about" className="hover:text-heritage-saffron transition-colors">Our story</Link></li>
              <li><Link to="/contact" className="hover:text-heritage-saffron transition-colors">Contact us</Link></li>
              <li><Link to="/shipping" className="hover:text-heritage-saffron transition-colors">Shipping policy</Link></li>
              <li><Link to="/returns" className="hover:text-heritage-saffron transition-colors">Returns & refunds</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-6 text-heritage-rudraksha">Newsletter</h4>
            <p className="text-sm text-heritage-grey mb-4">Join our community for spiritual insights.</p>
            <div className="flex border-b border-gray-300 pb-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-heritage-charcoal"
              />
              <button className="text-sm font-bold text-heritage-rudraksha hover:text-heritage-saffron transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-heritage-mist pt-10 mt-16 gap-4">
          <p className="text-sm text-heritage-grey">
            © 2025 Vishwanatham. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-heritage-grey">
             <Link to="/privacy" className="hover:text-heritage-rudraksha">Privacy</Link>
             <Link to="/terms" className="hover:text-heritage-rudraksha">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;