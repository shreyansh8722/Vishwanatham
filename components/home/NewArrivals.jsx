import React from 'react';
import { ProductCard } from '../shop/ProductCard';

// Mock Data - "Japam" Style High-End Products
const newArrivals = [
  {
    id: 1,
    name: '5 Mukhi Rudraksha Mala',
    price: 1250,
    originalPrice: 2500,
    images: [
        'https://images.unsplash.com/photo-1603038930495-2c26279f6764?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1623151834261-24874f676239?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: 'Amethyst Healing Bracelet',
    price: 850,
    originalPrice: 1500,
    images: [
        'https://images.unsplash.com/photo-1590424600100-3486df5b9745?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1610189012906-47833d772097?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8,
    reviews: 95
  },
  {
    id: 3,
    name: 'Shri Yantra (Pure Copper)',
    price: 3500,
    originalPrice: 4200,
    images: [
        'https://images.unsplash.com/photo-1623151834261-24874f676239?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1603038930495-2c26279f6764?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 5.0,
    reviews: 42
  },
  {
    id: 4,
    name: '7 Chakra Stone Set',
    price: 999,
    originalPrice: 1999,
    images: [
        'https://images.unsplash.com/photo-1610189012906-47833d772097?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1567113300190-484852086433?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.7,
    reviews: 156
  }
];

// NOTE: Using 'export const' to match the named import in HomePage.jsx
export const NewArrivals = () => {
  return (
    <section className="py-16 px-4 bg-heritage-paper">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Header */}
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="font-cinzel text-3xl font-bold text-heritage-charcoal mb-2">
            New Arrivals
          </h2>
          <div className="w-16 h-0.5 bg-heritage-rudraksha mx-auto rounded-full opacity-50"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-fade-up" style={{animationDelay: '0.1s'}}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};