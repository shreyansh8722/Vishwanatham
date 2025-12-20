import React, { createContext, useState, useContext } from 'react';

// Explicitly export context
export const ProductContext = createContext();

// FIX 1: Rename the hook to 'useProducts' to match the import in NewArrivals
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Explicitly export provider
export const ProductProvider = ({ children }) => {
  // Mock data placeholder
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Divine Rudraksha Mala",
      price: 1500,
      originalPrice: 2000,
      discount: 25,
      category: "Rudraksha",
      image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=800&auto=format&fit=crop",
      isNew: true
    },
    {
      id: 2,
      name: "Rose Quartz Bracelet",
      price: 850,
      originalPrice: 1200,
      discount: 0,
      category: "Gemstones",
      image: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=800&auto=format&fit=crop",
      isNew: true
    },
    {
      id: 3,
      name: "Sringeri Crystal Meru",
      price: 2100,
      category: "Yantras",
      image: "https://images.unsplash.com/photo-1605218427360-3639a130c904?q=80&w=800&auto=format&fit=crop",
      isNew: false
    }
  ]);

  // FIX 2: Add 'fetchProducts' function so NewArrivals doesn't crash
  const fetchProducts = async ({ sortOption, batchSize }) => {
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: products });
      }, 500);
    });
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;