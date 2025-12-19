import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FabricEdit = ({ images = {} }) => {
  const navigate = useNavigate();

  const fabrics = [
    { id: 'katan', label: 'Katan Silk', desc: 'Purest, softest silk', link: '/shop?fabric=katan', defaultImg: 'https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=400' },
    { id: 'organza', label: 'Kora Organza', desc: 'Sheer & lightweight', link: '/shop?fabric=organza', defaultImg: 'https://images.unsplash.com/photo-1583391726247-e29237d8612f?q=80&w=400' },
    { id: 'georgette', label: 'Khaddi Georgette', desc: 'Flowy & textured', link: '/shop?fabric=georgette', defaultImg: 'https://images.unsplash.com/photo-1596472655431-8933b49ecb2d?q=80&w=400' },
    { id: 'tissue', label: 'Gold Tissue', desc: 'Metallic sheen', link: '/shop?fabric=tissue', defaultImg: 'https://images.unsplash.com/photo-1621623194266-4b3664963684?q=80&w=400' },
    { id: 'tussar', label: 'Tussar', desc: 'Rich & rustic', link: '/shop?fabric=tussar', defaultImg: 'https://images.unsplash.com/photo-1606744888123-2479e4362143?q=80&w=400' }
  ];

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2 block">The Material Edit</span><h2 className="font-serif text-3xl md:text-4xl text-black">Shop by Fabric</h2></div>
          <button onClick={() => navigate('/shop')} className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-1 hover:border-black">View All Fabrics <ArrowRight size={14} /></button>
        </div>
        <div className="flex overflow-x-auto pb-8 gap-6 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide snap-x">
          {fabrics.map((fabric) => (
            <div key={fabric.id} onClick={() => navigate(fabric.link)} className="flex-shrink-0 w-[200px] md:w-auto snap-start group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 relative">
                {/* USE ADMIN IMAGE IF AVAILABLE, ELSE DEFAULT */}
                <img src={images?.[fabric.id] || fabric.defaultImg} alt={fabric.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="text-center md:text-left"><h3 className="font-serif text-xl text-black mb-1 group-hover:text-[#B08D55]">{fabric.label}</h3><p className="font-sans text-xs text-gray-500 font-light">{fabric.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};