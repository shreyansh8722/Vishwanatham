import { useState, useEffect } from 'react';
import { collection, getDocs, query, select } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Fuse from 'fuse.js';

// Cache the index outside the hook so it doesn't reload on every render
let productIndex = null;
let fuseInstance = null;

export const useProductSearch = () => {
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fuseInstance) {
      setIsReady(true);
      return;
    }

    const buildIndex = async () => {
      setLoading(true);
      try {
        // Fetch ONLY necessary fields to save data (Name, ID, Price, Image, Category)
        const q = query(collection(db, 'products'));
        const snap = await getDocs(q);
        
        productIndex = snap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            category: data.category,
            subCategory: data.subCategory,
            featuredImageUrl: data.featuredImageUrl,
            // Combine keywords for better search
            searchString: `${data.name} ${data.category} ${data.subCategory} ${data.keywords?.join(' ')}`
          };
        });

        // Initialize Fuse with "Fuzzy" settings
        fuseInstance = new Fuse(productIndex, {
          keys: ['name', 'category', 'subCategory', 'searchString'],
          threshold: 0.4, // 0.0 = Exact match, 1.0 = Match anything. 0.4 is good for typos.
          distance: 100,
        });

        setIsReady(true);
      } catch (err) {
        console.error("Failed to build search index", err);
      } finally {
        setLoading(false);
      }
    };

    buildIndex();
  }, []);

  const search = (term) => {
    if (!fuseInstance || !term) return [];
    return fuseInstance.search(term).map(result => result.item);
  };

  return { search, loading, isReady };
};