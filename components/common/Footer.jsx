import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-heritage-charcoal text-heritage-paper py-20 border-t-4 border-heritage-gold font-montserrat">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-1">
            <div className="mb-6">
              <Link to="/">
                <BrandLogo lightMode={true} className="items-start" />
              </Link>
            </div>
            <p className="font-montserrat text-sm font-light leading-7 text-heritage-paper/80">
              Vishwanatham is a bridge to the ancient spiritual heritage of Varanasi, curated for the modern seeker. Handcrafted with devotion.
            </p>
          </div>
          
          <div>
            <h4 className="font-cormorant text-2xl text-heritage-gold mb-6 italic">Shop</h4>
            <ul className="space-y-4 text-sm tracking-wider uppercase text-heritage-paper/90">
              <li><Link to="/shop?category=Rudraksha" className="hover:text-heritage-gold transition-colors">Rudraksha</Link></li>
              <li><Link to="/shop?category=Gemstones" className="hover:text-heritage-gold transition-colors">Gemstones</Link></li>
              <li><Link to="/shop?category=Yantras" className="hover:text-heritage-gold transition-colors">Yantras</Link></li>
              <li><Link to="/shop?category=Incense" className="hover:text-heritage-gold transition-colors">Incense</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-2xl text-heritage-gold mb-6 italic">Company</h4>
            <ul className="space-y-4 text-sm tracking-wider uppercase text-heritage-paper/90">
              <li><Link to="/about" className="hover:text-heritage-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-heritage-gold transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-heritage-gold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-heritage-gold transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-2xl text-heritage-gold mb-6 italic">Newsletter</h4>
            <p className="text-sm font-light mb-4 text-heritage-paper/80">Receive spiritual insights and exclusive offers.</p>
            <div className="flex border-b border-heritage-gold/50 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none text-sm w-full text-heritage-paper placeholder-heritage-paper/40 uppercase tracking-wider focus:ring-0"
              />
              <button className="text-sm uppercase tracking-widest text-heritage-gold hover:text-white transition-colors font-bold">Join</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-heritage-paper/10 pt-10 gap-4">
          <p className="text-[11px] uppercase tracking-widest text-heritage-paper/60">
            © 2025 Vishwanatham Ecosystem.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-widest text-heritage-paper/60">
             <Link to="/privacy" className="hover:text-heritage-gold">Privacy</Link>
             <Link to="/terms" className="hover:text-heritage-gold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;