import React, { createContext, useState, useContext } from 'react';

// Explicitly export context
export const ProductContext = createContext();

// Fix: Export the hook specifically
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

// Explicitly export provider
export const ProductProvider = ({ children }) => {
  // Mock data placeholder for now - replace with actual API calls/Supabase/Firebase
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Divine Rudraksha Mala",
      price: 1500,
      category: "Rudraksha",
      image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=800&auto=format&fit=crop"
    }
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;