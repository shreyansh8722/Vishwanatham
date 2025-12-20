import React from 'react';
import { CheckCircle2, Zap, Truck, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle2 strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-heritage-gold" />,
    title: "100% Original",
    desc: "Lab Certified Items"
  },
  {
    icon: <Zap strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-heritage-gold" />,
    title: "Energized",
    desc: "Pran Pratishtha in Kashi"
  },
  {
    icon: <Truck strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-heritage-gold" />,
    title: "Express Shipping",
    desc: "Dispatched in 24 Hrs"
  },
  {
    icon: <ShieldCheck strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-heritage-gold" />,
    title: "Secure Payment",
    desc: "100% Safe Checkout"
  }
];

export const TrustStrip = () => {
  return (
    <div className="bg-[#FAF9F6] py-8 border-y border-stone-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-white rounded-full shadow-sm mb-1">
                {item.icon}
              </div>
              <h4 className="font-cormorant text-lg font-bold text-heritage-charcoal leading-none">
                {item.title}
              </h4>
              <p className="font-montserrat text-[10px] uppercase tracking-wider text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;