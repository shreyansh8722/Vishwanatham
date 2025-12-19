import React from 'react';

export const TechniqueShowcase = () => {
  const techniques = [
    { title: "Kadhua", desc: "The art of discontinuous weft, where motifs are woven individually by hand.", img: "https://images.unsplash.com/photo-1605293296354-90aa835d4d2d?auto=format&fit=crop&q=80&w=600" },
    { title: "Tanchoi", desc: "A weaving technique involving a single or double warp and multiple colored wefts.", img: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&q=80&w=600" },
    { title: "Jangla", desc: "Characterized by scrolling vegetation motifs, representing the oldest Banarasi tradition.", img: "https://images.unsplash.com/photo-1596472655431-8933b49ecb2d?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section className="py-24 px-6 md:px-20 max-w-[1920px] mx-auto bg-white">
      <div className="mb-16 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B08D55] mb-3 block">Mastery of the Loom</span>
        <h2 className="font-serif text-4xl text-[#1a1a1a]">Techniques of Banaras</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techniques.map((tech) => (
          <div key={tech.title} className="group cursor-default">
            <div className="overflow-hidden mb-6 aspect-[4/3]">
              <img src={tech.img} alt={tech.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <h3 className="font-serif text-2xl mb-3 text-[#1a1a1a]">{tech.title}</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs">{tech.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};