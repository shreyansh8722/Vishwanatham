import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../shop/ProductCard'; // Importing the standard card

const BestSellers = () => {
  const { products } = useProducts(); 
  const navigate = useNavigate();

  // Fallback to show 4 items (either real products or placeholders if empty)
  const displayProducts = products.length > 0 ? products.slice(0, 4) : [
    { id: 1, name: "5 Mukhi Rudraksha (Original)", price: 499, comparePrice: 999, featuredImageUrl: "https://via.placeholder.com/300" },
    { id: 2, name: "Natural Pyrite Stone", price: 1299, comparePrice: 2499, featuredImageUrl: "https://via.placeholder.com/300" },
    { id: 3, name: "Sphatik Mala (Crystal)", price: 899, comparePrice: 1599, featuredImageUrl: "https://via.placeholder.com/300" },
    { id: 4, name: "Gomati Chakra Set", price: 299, comparePrice: 599, featuredImageUrl: "https://via.placeholder.com/300" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-heritage-rudraksha font-bold text-xs tracking-[0.2em] uppercase block mb-2">
              Devotee Favorites
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heritage-charcoal">
              Best Sellers
            </h2>
          </div>
          <button 
            onClick={() => navigate('/shop')} 
            className="text-heritage-rudraksha font-bold text-xs uppercase tracking-widest border-b-2 border-heritage-rudraksha pb-1 hover:text-heritage-crimson transition-colors"
          >
            View All Products
          </button>
        </div>

        {/* Product Grid - Using the standard ProductCard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestSellers;