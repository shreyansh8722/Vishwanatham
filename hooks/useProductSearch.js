import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

/**
 * useProductSearch - Client-side search engine for Vishwanatham
 * Fixes the 'select' export error by using standard Firestore modular syntax.
 */
export const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // We fetch the main fields needed for search. 
        // Firestore Web SDK fetches whole docs; we filter in memory for speed.
        const q = query(collection(db, 'products'), limit(100));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
        setIsReady(true);
      } catch (error) {
        console.error("Search index failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const search = (term) => {
    if (!term) return [];
    const lowerTerm = term.toLowerCase();
    return products.filter(p => 
      p.name?.toLowerCase().includes(lowerTerm) || 
      p.category?.toLowerCase().includes(lowerTerm) ||
      p.tags_lowercase?.some(tag => tag.includes(lowerTerm))
    );
  };

  return { search, loading, isReady };
};