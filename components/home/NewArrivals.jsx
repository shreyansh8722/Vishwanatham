import React from 'react';
import { useProducts } from '../../context/ProductContext'; 
import ProductCard from '../shop/ProductCard'; 
import { Loader2 } from 'lucide-react';

export const NewArrivals = () => {
  const { products, loading } = useProducts();
  const latestProducts = products.slice(0, 8);

  if (loading) {
    return (
      <div className="py-24 flex justify-center bg-heritage-paper">
        <Loader2 className="animate-spin text-heritage-gold" size={32} />
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-white border-t border-heritage-mist/30"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Editorial Style */}
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-xs font-bold font-body text-heritage-gold tracking-[0.2em] uppercase mb-2 block">
            Fresh from Varanasi
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-heritage-charcoal mb-4">
            New Arrivals
          </h2>
          <div className="w-12 h-0.5 bg-heritage-rudraksha/20 mx-auto"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 animate-fade-up">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-heritage-grey font-heading text-xl italic">
                Our artisans are crafting new blessings...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};