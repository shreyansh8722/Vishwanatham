import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ProductTabs = ({ product }) => {
  const [openTab, setOpenTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', content: product.description },
    { id: 'material', label: 'Material & Care', content: product.material || 'Dry Clean Only. Store in a cool, dry place.' },
    { id: 'shipping', label: 'Shipping & Returns', content: 'Free shipping on orders above ₹5000. 7-day return policy available.' }
  ];

  return (
    <div className="border-t border-stone-200">
      {tabs.map((tab) => (
        <div key={tab.id} className="border-b border-stone-200">
          <button
            onClick={() => setOpenTab(openTab === tab.id ? null : tab.id)}
            className="w-full py-5 flex items-center justify-between text-left group"
          >
            <span className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors uppercase tracking-wide">
              {tab.label}
            </span>
            <span className="text-stone-400">
              {openTab === tab.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openTab === tab.id ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
            <div className="text-sm text-stone-600 leading-relaxed prose prose-stone">
              {tab.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTabs;