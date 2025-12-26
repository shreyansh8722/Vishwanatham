import React from 'react';
import { useProducts } from '../../context/ProductContext'; 
import ProductCard from '../shop/ProductCard'; 
import { Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const { products, loading } = useProducts();
  // Getting the latest 4 or 8 products. 
  // Assuming 'products' might be sorted by date in context, or just taking the first few.
  const latestProducts = products.slice(0, 4); 

  if (loading) {
    return (
      <div className="py-24 flex justify-center bg-white">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-white"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Clean & Minimal (Removed Eyebrow Text as requested) */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Freshly energized artifacts from the Ghats.
            </p>
          </div>
          
          <Link to="/shop?sort=new" className="hidden md:flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-black transition-colors">
             View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-400 italic">
                Our artisans are crafting new blessings...
              </p>
            </div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden text-center">
          <Link to="/shop?sort=new">
            <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded shadow-lg">
              View All New
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// FIX: This 'default' export is what allows 'import NewArrivals from ...' to work
export default NewArrivals;