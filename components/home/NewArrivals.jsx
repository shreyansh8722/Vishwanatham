import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Ensure this path is correct
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { ProductCard } from '../shop/ProductCard';
import { Loader2 } from 'lucide-react';

export const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        // Fetch 10 newest products
        const q = query(
          collection(db, 'products'), 
          orderBy('createdAt', 'desc'), 
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#B08D55]" /></div>;

  return (
    // REMOVED: bg-heritage-paper / bg-[#fcfbf9]
    <section className="py-12 px-4"> 
      <div className="max-w-7xl mx-auto">
        {/* Header - REMOVED: "Fresh from holy city" text */}
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="font-cinzel text-2xl font-bold text-[#1a1a1a] mb-2">
            New Arrivals
          </h2>
          <div className="w-12 h-0.5 bg-[#B08D55] mx-auto rounded-full opacity-50"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-fade-up">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              No products found. Add some from Admin Panel.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};