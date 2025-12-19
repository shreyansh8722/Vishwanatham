import React, { createContext, useContext, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where, limit, startAfter } from 'firebase/firestore';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- DYNAMIC FETCH FUNCTION ---
  // Allows fetching specific categories, sorting, and pagination
  const fetchProducts = useCallback(async ({ 
    category = null, 
    subCategory = null, 
    sortOption = 'newest',
    lastDoc = null,
    batchSize = 12
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let constraints = [collection(db, 'products')];

      // 1. Filtering
      if (category && category !== 'all') {
         // Note: Ensure your Firestore has indexes for these queries
         constraints.push(where('category', '==', category));
      }
      if (subCategory) {
         constraints.push(where('subCategory', '==', subCategory));
      }

      // 2. Sorting
      switch (sortOption) {
        case 'price_low':
          constraints.push(orderBy('price', 'asc'));
          break;
        case 'price_high':
          constraints.push(orderBy('price', 'desc'));
          break;
        case 'newest':
        default:
          constraints.push(orderBy('createdAt', 'desc'));
          break;
      }

      // 3. Pagination
      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }
      
      constraints.push(limit(batchSize));

      const q = query(...constraints);
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      
      setLoading(false);
      return { data, lastVisible, hasMore: data.length === batchSize };

    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setLoading(false);
      return { data: [], lastVisible: null, hasMore: false };
    }
  }, []);

  return (
    <ProductContext.Provider value={{ fetchProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};