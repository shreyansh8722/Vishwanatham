import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { Search, Plus, Minus, AlertCircle, Package } from 'lucide-react';

export const InventoryManager = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const updateStock = async (id, amount) => {
    const ref = doc(db, 'products', id);
    await updateDoc(ref, {
      stock: increment(amount)
    });
  };

  // FIX: Added check (p.name || '') to prevent crash if name is missing
  const filtered = products.filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
             <Package className="text-[#B08D55]" /> Stock Control
          </h3>
          <p className="text-sm text-gray-500">Quickly adjust product quantities.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#B08D55] focus:ring-1 focus:ring-[#B08D55]/20 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1 bg-gray-50/30">
        {filtered.map(product => (
          <div key={product.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all group">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                 <img src={product.featuredImageUrl} alt="" className="w-full h-full object-cover" />
               </div>
               <div>
                 <h4 className="font-medium text-gray-900 line-clamp-1">{product.name || 'Unnamed Product'}</h4>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                      {product.subCategory}
                    </span>
                    {(product.stock || 0) < 5 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                        <AlertCircle size={10} /> Low Stock
                      </span>
                    )}
                 </div>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                 <button 
                   onClick={() => updateStock(product.id, -1)}
                   disabled={(product.stock || 0) <= 0}
                   className="p-2 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 text-gray-400 transition-colors border-r border-gray-100"
                 >
                   <Minus size={16} />
                 </button>
                 <div className="w-12 text-center text-sm font-bold text-gray-900">
                   {product.stock || 0}
                 </div>
                 <button 
                   onClick={() => updateStock(product.id, 1)}
                   className="p-2 hover:bg-green-50 hover:text-green-600 text-gray-400 transition-colors border-l border-gray-100"
                 >
                   <Plus size={16} />
                 </button>
               </div>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
            <div className="p-10 text-center text-gray-400">No products match your search.</div>
        )}
      </div>
    </div>
  );
};