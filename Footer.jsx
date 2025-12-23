import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo'; 
import { CheckCircle2, Zap, Truck, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    // BG: Warm Parchment per report 
    <footer className="bg-[#F9F7F2] border-t border-[#E5E5E5] pt-16 font-body text-[#2C2C2C]">
      
      {/* 1. TRUST STRIP [cite: 247] */}
      <div className="container mx-auto px-6 pb-12 border-b border-[#E5E5E5]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: CheckCircle2, title: "Lab Certified", desc: "100% Authentic" },
            { icon: Zap, title: "Energized", desc: "Kashi Vishwanath Temple" },
            { icon: Truck, title: "Express Shipping", desc: "All India Delivery" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "SSL Encrypted" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2">
              {/* Icon color: Deep Forest Green / Saffron Gold mix */}
              <item.icon className="w-6 h-6 text-[#8C8000]" strokeWidth={1.5} />
              <h4 className="font-heading text-lg font-bold">{item.title}</h4>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN LINKS */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/">
              <BrandLogo className="text-[#BC002D] h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-600">
              Vishwanatham bridges the gap between ancient Vedic tradition and modern life. 
              We provide tools for spiritual growth, sourced directly from the holy city of Varanasi.
            </p>
          </div>
          
          {/* Collections - Headings: Playfair [cite: 47] */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-[#2C2C2C]">Collections</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/shop?category=Rudraksha" className="hover:text-[#BC002D] transition-colors">Rudraksha</Link></li>
              <li><Link to="/shop?category=Gemstones" className="hover:text-[#BC002D] transition-colors">Gemstones</Link></li>
              <li><Link to="/shop?category=Yantras" className="hover:text-[#BC002D] transition-colors">Yantras</Link></li>
              <li><Link to="/shop?category=Parad" className="hover:text-[#BC002D] transition-colors">Parad</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-[#2C2C2C]">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/track-order" className="hover:text-[#BC002D] transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-[#BC002D] transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-[#BC002D] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-[#BC002D] transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-[#2C2C2C]">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                 <MapPin size={18} className="text-[#8C8000] shrink-0" />
                 <span>Godowlia Chowk, Varanasi,<br/>Uttar Pradesh, 221001</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone size={18} className="text-[#8C8000] shrink-0" />
                 <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail size={18} className="text-[#8C8000] shrink-0" />
                 <span>support@vishwanatham.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#E5E5E5] pt-8 mt-10 gap-4">
          <p className="text-xs text-gray-500">
            © 2025 Vishwanatham. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-bold uppercase tracking-wider">
             <Link to="/privacy" className="hover:text-[#BC002D]">Privacy</Link>
             <Link to="/terms" className="hover:text-[#BC002D]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;