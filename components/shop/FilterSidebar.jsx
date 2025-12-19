import React, { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

const FILTER_GROUPS = [
  {
    id: 'subCategory', // Matches the DB field 'subCategory'
    label: 'Category',
    options: ['Saree', 'Lehenga', 'Suit', 'Dupatta', 'Men']
  },
  {
    id: 'fabric',
    label: 'Fabric',
    options: ['Katan Silk', 'Georgette', 'Organza', 'Munga Silk', 'Tussar']
  },
  {
    id: 'technique',
    label: 'Technique',
    options: ['Kadhua', 'Fekwa', 'Tanchoi', 'Jangla', 'Meenakari']
  },
  // Price is visual only right now, can be connected later
  // {
  //   id: 'priceRange',
  //   label: 'Price Range',
  //   options: ['Under ₹10,000', '₹10k - ₹25k', '₹25k - ₹50k', 'Above ₹50,000']
  // }
];

const FilterSection = ({ group, isOpen, onToggle, selectedValues = [], onChange }) => {
  return (
    <div className="border-b border-heritage-border py-4">
      <button 
        onClick={() => onToggle(group.id)} 
        className="flex justify-between items-center w-full py-2 group"
      >
        <span className="text-xs uppercase tracking-widest text-heritage-charcoal group-hover:text-heritage-gold transition-colors">
          {group.label}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-2 pb-2">
          {group.options.map(option => {
            const isChecked = selectedValues.includes(option);
            return (
              <label key={option} className="flex items-center gap-3 cursor-pointer group/item hover:opacity-80">
                <div className={`relative w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${isChecked ? 'border-heritage-gold bg-heritage-gold' : 'border-heritage-grey/40 group-hover/item:border-heritage-gold'}`}>
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer"
                    checked={isChecked}
                    onChange={() => onChange(group.id, option)}
                  />
                  <Check size={10} className={`text-white transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <span className={`text-sm font-sans ${isChecked ? 'text-heritage-charcoal font-medium' : 'text-heritage-grey'}`}>{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const FilterSidebar = ({ mobile, filters = {}, setFilters }) => {
  const [openSections, setOpenSections] = useState(['subCategory', 'fabric']);

  const toggleSection = (id) => {
    setOpenSections(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleFilterChange = (groupId, value) => {
    setFilters(prev => {
      const groupValues = prev[groupId] || [];
      const newGroupValues = groupValues.includes(value)
        ? groupValues.filter(v => v !== value)
        : [...groupValues, value];
      
      // If array is empty, remove the key entirely to keep state clean
      if (newGroupValues.length === 0) {
        const { [groupId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [groupId]: newGroupValues };
    });
  };

  const clearFilters = () => setFilters({});

  return (
    <div className={`flex flex-col ${mobile ? '' : 'pr-8'}`}>
      {!mobile && <h3 className="text-lg font-serif italic mb-6 text-heritage-charcoal">Filters</h3>}
      
      {FILTER_GROUPS.map(group => (
        <FilterSection 
          key={group.id} 
          group={group} 
          isOpen={openSections.includes(group.id)} 
          onToggle={toggleSection}
          selectedValues={filters[group.id] || []}
          onChange={handleFilterChange}
        />
      ))}

      {Object.keys(filters).length > 0 && (
        <button 
          onClick={clearFilters}
          className="mt-8 text-xs uppercase tracking-widest text-heritage-grey hover:text-red-600 flex items-center gap-2 transition-colors border-t border-dashed border-gray-200 pt-4 w-full"
        >
          <X size={12} /> Clear All Filters
        </button>
      )}
    </div>
  );
};