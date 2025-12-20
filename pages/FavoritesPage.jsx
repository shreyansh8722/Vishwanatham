import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/shop/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-heritage-paper pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-heritage-charcoal mb-3">
            Your Wishlist
          </h1>
          <div className="w-16 h-1 bg-heritage-rudraksha mx-auto rounded-full"></div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-heritage-sand/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-heritage-rudraksha opacity-50" />
            </div>
            <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-heritage-grey mb-8 text-sm leading-relaxed">
              Save items you love here. Review them anytime and add them to your bag when you are ready.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-heritage-rudraksha text-white px-8 py-3 rounded font-bold hover:bg-heritage-saffron transition-all shadow-md"
            >
              Start shopping <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;