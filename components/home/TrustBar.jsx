import React from 'react';
import { ShieldCheck, Truck, Flame, Award } from 'lucide-react';

const TrustBar = () => {
  const features = [
    { icon: <Flame size={20}/>, title: "Vedic Energization", desc: "100% Prana Pratistha" },
    { icon: <ShieldCheck size={20}/>, title: "Lab Certified", desc: "Guaranteed Authenticity" },
    { icon: <Award size={20}/>, title: "Sourced from Kashi", desc: "Direct from Origin" },
    { icon: <Truck size={20}/>, title: "Pan-India Shipping", desc: "Secure Delivery" },
  ];

  return (
    <div className="bg-white border-b border-heritage-mist py-6 relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-xl shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-heritage-parchment flex items-center justify-center text-heritage-rudraksha border border-heritage-mist">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-heading font-bold text-heritage-charcoal text-sm">{feature.title}</h4>
              <p className="text-[10px] text-heritage-grey uppercase tracking-wider">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;