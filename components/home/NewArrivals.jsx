import React from 'react';
import { useProducts } from '../../context/ProductContext'; 
import ProductCard from '../shop/ProductCard'; 
import { Loader2 } from 'lucide-react';

export const NewArrivals = () => {
  // 1. Get data from the same source as Shop Page (The JSON File)
  const { products, loading } = useProducts();

  // 2. Get the first 8 items
  const latestProducts = products.slice(0, 8);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#B08D55]" size={32} />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-white"> 
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-[#1C1917] mb-3">
            New Arrivals
          </h2>
          {/* Separator Line */}
          <div className="w-16 h-0.5 bg-[#B08D55] mx-auto rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 animate-fade-up">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-gray-400 font-cinzel">Collection arriving soon.</p>
              <p className="text-xs text-gray-300 mt-1">
              
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};