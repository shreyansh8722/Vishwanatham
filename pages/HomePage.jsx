import React from 'react';
import { ArrowRight, Star, PlayCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import SEO from '../components/SEO';

const HomePage = () => {
  const collections = [
    { 
      title: "Rudraksha", 
      subtitle: "Seeds of Lord Shiva", 
      img: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=600&auto=format&fit=crop", 
      link: "/shop?category=Rudraksha" 
    },
    { 
      title: "Gemstones", 
      subtitle: "Cosmic Energy", 
      img: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=600&auto=format&fit=crop", 
      link: "/shop?category=Gemstones" 
    },
    { 
      title: "Kashi Prasad", 
      subtitle: "Blessed Offerings", 
      img: "https://images.unsplash.com/photo-1606293926075-69a00fb88816?q=80&w=600&auto=format&fit=crop", 
      link: "/shop?category=Prasad" 
    },
    { 
      title: "Yantras", 
      subtitle: "Sacred Geometry", 
      img: "https://images.unsplash.com/photo-1605218427360-3639a130c904?q=80&w=600&auto=format&fit=crop", 
      link: "/shop?category=Yantra" 
    }
  ];

  return (
    <div className="bg-heritage-paper min-h-screen text-heritage-charcoal font-montserrat selection:bg-heritage-gold selection:text-white">
      <SEO 
        title="Home" 
        description="Vishwanatham: The authentic spiritual ecosystem of Kashi. Discover Rudraksha, Gemstones, and daily rituals."
      />

      <Hero />

      {/* --- FEATURED COLLECTIONS --- */}
      <section className="py-24 md:py-32 bg-heritage-paper">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[1px] w-8 bg-heritage-gold"></div>
                <span className="text-xs uppercase tracking-[0.2em] text-heritage-gold font-medium">Sacred Offerings</span>
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl text-heritage-charcoal">Curated from Kashi</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest border-b border-heritage-charcoal pb-1 hover:text-heritage-gold hover:border-heritage-gold transition-colors duration-300">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {collections.map((item, idx) => (
              <Link to={item.link} key={idx} className="group cursor-pointer block">
                <div className="relative aspect-[3/4] overflow-hidden bg-heritage-mist mb-6 shadow-sm group-hover:shadow-md transition-all duration-500">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-heritage-charcoal px-8 py-4 text-[10px] uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-medium">
                      Explore
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-cormorant text-2xl text-heritage-charcoal mb-1 italic">{item.title}</h3>
                  <p className="font-montserrat text-[10px] uppercase tracking-widest text-heritage-grey">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE SANKALP CHALLENGE (High Engagement Section) --- */}
      <section className="bg-heritage-sand relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-heritage-mist/30 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Visual Side */}
            <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-[80vh] overflow-hidden order-2 lg:order-1">
              <div className="absolute inset-4 border border-heritage-gold/30 z-20 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                alt="Meditation & Chanting"
                loading="lazy"
              />
              <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-sm p-6 max-w-xs shadow-lg hidden md:block">
                <p className="font-cormorant text-xl text-heritage-charcoal italic leading-snug">"Mantra is the boat to cross the ocean of the mind."</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 py-20 lg:py-32 lg:pl-24 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-heritage-gold/10 p-2 rounded-full">
                   <Users className="w-4 h-4 text-heritage-gold" />
                 </div>
                 <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-heritage-grey">Join 12,400+ Seekers</span>
              </div>
              
              <h2 className="font-cormorant text-5xl md:text-7xl text-heritage-charcoal mb-8 leading-[0.9]">
                The Sankalp <br/><span className="text-heritage-gold italic">Challenge</span>
              </h2>
              
              <p className="font-montserrat text-heritage-grey font-light leading-7 mb-10 max-w-md text-sm">
                Spirituality is not just a concept; it's a daily practice. Join our community in a <strong>21-day guided mantra chanting journey</strong>. Build discipline, find inner silence, and connect with the divine.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-12 border-t border-heritage-border pt-8">
                <div>
                  <span className="block font-cormorant text-4xl text-heritage-charcoal">21</span>
                  <span className="text-[9px] uppercase tracking-widest text-heritage-grey mt-1 block">Days</span>
                </div>
                <div>
                  <span className="block font-cormorant text-4xl text-heritage-charcoal">108</span>
                  <span className="text-[9px] uppercase tracking-widest text-heritage-grey mt-1 block">Chants Daily</span>
                </div>
                <div>
                  <span className="block font-cormorant text-4xl text-heritage-charcoal">Free</span>
                  <span className="text-[9px] uppercase tracking-widest text-heritage-grey mt-1 block">To Join</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-heritage-charcoal text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-heritage-grey transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300">
                  Start Your Journey
                </button>
                <button className="border border-heritage-charcoal text-heritage-charcoal px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-heritage-charcoal hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE DARSHAN TEASER --- */}
      <section className="py-32 bg-heritage-charcoal text-white text-center relative overflow-hidden group">
        {/* Parallax-like Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none transition-transform duration-[3s] group-hover:scale-110" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-charcoal via-transparent to-heritage-charcoal opacity-80 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 cursor-pointer hover:bg-white hover:text-heritage-charcoal transition-all duration-500 group-hover:scale-110">
            <PlayCircle className="w-8 h-8 ml-1" strokeWidth={1} />
          </div>
          
          <span className="text-heritage-gold text-[10px] uppercase tracking-[0.3em] mb-4 animate-pulse">Live Now</span>
          
          <h2 className="font-cormorant text-5xl md:text-7xl mb-8 leading-none">
            Live From <span className="italic">Kashi</span>
          </h2>
          
          <p className="font-montserrat text-heritage-sand/70 font-light max-w-xl mx-auto mb-12 leading-relaxed text-sm">
            Connect with the divine energy of the Vishwanath temple. Witness the daily Ganga Aarti and Rudrabhishek performed by our pundits, streaming directly to your home.
          </p>
          
          <button className="border border-white/30 px-12 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-heritage-charcoal transition-all duration-500 backdrop-blur-sm">
            View Schedule & Join
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;