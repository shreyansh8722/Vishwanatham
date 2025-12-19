import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { useSiteAssets } from '@/hooks/useSiteAssets'; // Using your new asset system

export default function AboutPage() {
  const { getAsset } = useSiteAssets();

  // You can upload these specific story images via your Admin AssetManager later
  // For now, we use high-quality Unsplash fallbacks that fit the vibe
  const HERO_IMG = "https://images.unsplash.com/photo-1596230529625-7eeeff6f1a8c?q=80&w=2000";
  const WEAVER_IMG = "https://images.unsplash.com/photo-1610189012906-47833d7b3a4c?q=80&w=1200";
  const CITY_IMG = "https://images.unsplash.com/photo-1561585646-fa1fb90b9c71?q=80&w=1200"; // Varanasi Ghats

  return (
    <div className="min-h-screen bg-white font-serif text-heritage-charcoal selection:bg-heritage-gold/20">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={HERO_IMG} 
          alt="The Loom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-bold font-sans uppercase tracking-[0.3em] mb-6"
          >
            Since 1985
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl italic font-light leading-tight"
          >
            Preserving the <br/> Soul of Banaras
          </motion.h1>
        </div>
      </div>

      {/* --- CHAPTER 1: THE ORIGIN --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-heritage-gold text-xs font-bold uppercase tracking-widest">01. The Origin</span>
            <h2 className="text-4xl italic text-heritage-charcoal leading-snug">
              "We don't just weave cloth; <br/> we weave history."
            </h2>
            <div className="space-y-6 text-gray-600 font-sans text-lg leading-relaxed font-light">
              <p>
                Pahnawa Banaras was born from a simple yet profound realization: the ancient art of handloom weaving, 
                passed down through generations in the narrow alleys of Kashi, was slowly being drowned out by the noise of mass production.
              </p>
              <p>
                Founded by a family of textile connoisseurs, our mission was to create a sanctuary for the *Kadhua* and *Fekwa* techniques. 
                Every saree we curate is a labor of love, taking anywhere from 4 weeks to 6 months to complete.
              </p>
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" 
              alt="Signature" 
              className="h-12 opacity-50 mt-8" 
            />
          </div>
          <div className="relative">
            <div className="aspect-[3/4] bg-heritage-sand overflow-hidden rounded-sm">
              <img src={WEAVER_IMG} alt="Master Weaver" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-xl border border-gray-100 max-w-xs hidden md:block">
              <p className="font-serif italic text-xl text-heritage-charcoal">
                "The loom is my temple, and the silk is my prayer."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-4">— Master Weaver, Kabir</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHAPTER 2: THE CITY --- */}
      <section className="bg-[#FAF9F6] py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="aspect-square bg-white p-2 border border-gray-200">
               <img src={CITY_IMG} alt="Varanasi Ghats" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <span className="text-heritage-gold text-xs font-bold uppercase tracking-widest">02. The Muse</span>
            <h2 className="text-4xl italic text-heritage-charcoal">
              Kashi: The City of Light
            </h2>
            <div className="space-y-6 text-gray-600 font-sans text-lg leading-relaxed font-light">
              <p>
                Our designs are not created in a vacuum; they are whispered by the city itself. The geometric patterns of the *Ghats*, 
                the floral motifs from the temple offerings, and the golden hues of the evening *Aarti* on the Ganges—all find their way into our textiles.
              </p>
              <p>
                To wear Pahnawa is to wear a piece of Varanasi. It is to wrap yourself in the spiritual and cultural fabric of the oldest living city in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHAPTER 3: THE PROMISE --- */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-heritage-gold text-xs font-bold uppercase tracking-widest">03. Our Promise</span>
          <h2 className="text-4xl md:text-5xl italic text-heritage-charcoal">
            The Silk Mark of Purity
          </h2>
          <p className="text-gray-600 font-sans text-lg leading-relaxed font-light">
            In an era of blends and power-looms, we stand firm in our commitment to authenticity. 
            Every Pahnawa creation comes with the assurance of 100% pure silk and a direct-to-weaver fair trade promise. 
            When you choose us, you don't just buy a saree; you sustain a lineage.
          </p>
          <div className="pt-8">
            <img src="https://www.silkmarkindia.com/silk_mark_logo.png" alt="Silk Mark" className="h-16 mx-auto opacity-80 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}