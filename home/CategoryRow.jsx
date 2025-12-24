import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { title: "Rudraksha", img: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=400&h=500&fit=crop", link: "/shop?cat=rudraksha" },
  { title: "Malas", img: "https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=400&h=500&fit=crop", link: "/shop?cat=malas" },
  { title: "Yantras", img: "https://images.unsplash.com/photo-1623151834261-24874f676239?q=80&w=400&h=500&fit=crop", link: "/shop?cat=yantras" },
  { title: "Gemstones", img: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=400&h=500&fit=crop", link: "/shop?cat=gemstones" },
  { title: "Idols", img: "https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=400&h=500&fit=crop", link: "/shop?cat=idols" },
  { title: "Bracelets", img: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=400&h=500&fit=crop", link: "/shop?cat=bracelets" },
];

export const CategoryRow = () => (
  <section className="py-12 bg-heritage-paper border-b border-gray-100">
    <div className="container mx-auto px-4">
      
      {/* Creative Heading */}
      <div className="text-center mb-10">
        <h3 className="font-heading text-3xl font-medium text-heritage-charcoal">
          Sacred Offerings
        </h3>
        <p className="font-manrope text-sm text-heritage-grey mt-2">Browse by category</p>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center px-2">
        {categories.map((c, i) => (
          <Link key={i} to={c.link} className="flex flex-col items-center gap-3 min-w-[120px] group cursor-pointer">
            {/* Arched Image */}
            <div className="w-full aspect-[4/5] overflow-hidden rounded-t-[50px] rounded-b-md shadow-sm bg-heritage-sand">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            {/* FUNCTIONAL LABEL (Sans Serif) */}
            <span className="text-xs font-bold font-manrope uppercase tracking-wider text-heritage-charcoal group-hover:text-heritage-rudraksha transition-colors">
              {c.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);