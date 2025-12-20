import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const FilterSidebar = ({ mobile, closeSidebar }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    material: true,
    purpose: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ["Rudraksha", "Gemstones", "Yantras", "Mala", "Idols", "Incense"];
  const materials = ["Gold", "Silver", "Copper", "Wood", "Crystal", "Stone"];
  const purposes = ["Meditation", "Wealth", "Health", "Protection", "Relationships"];

  return (
    <div className={`h-full ${mobile ? '' : 'sticky top-32'}`}>
      {!mobile && (
        <h3 className="font-cormorant text-2xl mb-6 text-stone-900 border-b border-stone-100 pb-2">
          Refine Search
        </h3>
      )}

      <div className="space-y-6">
        {/* Category Filter */}
        <div className="border-b border-stone-100 pb-6">
          <button 
            onClick={() => toggleSection('category')}
            className="flex justify-between items-center w-full mb-4 group"
          >
            <span className="text-xs uppercase tracking-widest font-medium text-stone-900">Category</span>
            {expandedSections.category ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
          </button>
          
          {expandedSections.category && (
            <div className="space-y-2 animate-fade-in">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-stone-300 checked:bg-stone-900 checked:border-stone-900 transition-colors" />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-montserrat text-stone-600 group-hover:text-stone-900 transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border-b border-stone-100 pb-6">
          <button 
            onClick={() => toggleSection('price')}
            className="flex justify-between items-center w-full mb-4"
          >
            <span className="text-xs uppercase tracking-widest font-medium text-stone-900">Price</span>
            {expandedSections.price ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
          </button>
          
          {expandedSections.price && (
            <div className="animate-fade-in">
              <div className="flex justify-between text-xs text-stone-500 mb-2 font-montserrat">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}+</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
            </div>
          )}
        </div>

        {/* Material Filter */}
        <div className="border-b border-stone-100 pb-6">
          <button 
            onClick={() => toggleSection('material')}
            className="flex justify-between items-center w-full mb-4"
          >
            <span className="text-xs uppercase tracking-widest font-medium text-stone-900">Material</span>
            {expandedSections.material ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
          </button>
          
          {expandedSections.material && (
            <div className="space-y-2 animate-fade-in">
              {materials.map(mat => (
                <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-stone-300 checked:bg-stone-900 checked:border-stone-900 transition-colors" />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-montserrat text-stone-600 group-hover:text-stone-900 transition-colors">{mat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="pt-4">
          <button className="w-full bg-stone-900 text-white py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
            Apply Filters
          </button>
          <button className="w-full mt-3 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors underline decoration-stone-300 underline-offset-4">
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;