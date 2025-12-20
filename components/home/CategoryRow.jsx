import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { title: "Rudraksha", img: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=300&h=300&fit=crop", link: "/shop?cat=rudraksha" },
  { title: "Malas", img: "https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=300&h=300&fit=crop", link: "/shop?cat=malas" },
  { title: "Bracelets", img: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=300&h=300&fit=crop", link: "/shop?cat=bracelets" },
  { title: "Yantras", img: "https://images.unsplash.com/photo-1623151834261-24874f676239?q=80&w=300&h=300&fit=crop", link: "/shop?cat=yantras" },
  { title: "Gemstones", img: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=300&h=300&fit=crop", link: "/shop?cat=gemstones" },
  { title: "Idols", img: "https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=300&h=300&fit=crop", link: "/shop?cat=idols" },
];

export const CategoryRow = () => (
  <section className="py-10 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="flex gap-6 md:gap-12 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center px-2">
        {categories.map((c, i) => (
          <Link key={i} to={c.link} className="flex flex-col items-center gap-3 min-w-[70px] group">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full overflow-hidden border border-gray-200 p-1 group-hover:border-heritage-gold transition-colors">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800 group-hover:text-heritage-gold transition-colors">{c.title}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);