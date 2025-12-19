import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { useLoginModal } from '@/context/LoginModalContext';
import toast from 'react-hot-toast';

export function useFavorites() {
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME LISTENER
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    
    // Listen to user document for favorites changes
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const safeFavs = (data.favorites || []).map(id => String(id));
        setFavorites(safeFavs);
      } else {
        // Automatically create user doc if missing
        setDoc(userRef, { favorites: [], email: user.email }, { merge: true });
        setFavorites([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Wishlist Sync Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. TOGGLE ACTION
  const toggleFavorite = async (productId) => {
    if (!user) {
      openLoginModal(); 
      return;
    }

    if (!productId) {
      console.error("No product ID provided to toggleFavorite");
      return;
    }

    const idString = String(productId);
    const userRef = doc(db, 'users', user.uid);
    const isAlreadyFavorite = favorites.includes(idString);

    try {
      // Optimistic UI could go here, but Firestore is usually fast enough.
      if (isAlreadyFavorite) {
        await updateDoc(userRef, { favorites: arrayRemove(idString) });
        toast.success("Removed from Wishlist", { 
          style: { background: '#333', color: '#fff', borderRadius: '0px' },
          icon: '💔'
        });
      } else {
        // Use setDoc with merge to ensure it works even if doc is missing
        await setDoc(userRef, { favorites: arrayUnion(idString) }, { merge: true });
        toast.success("Added to Wishlist", { 
          style: { background: '#333', color: '#fff', borderRadius: '0px' },
          icon: '❤️'
        });
      }
    } catch (err) {
      console.error("Wishlist Update Failed:", err);
      toast.error("Could not update wishlist");
    }
  };

  const isFavorite = (id) => favorites.includes(String(id));

  return { favorites, isFavorite, toggleFavorite, loading };
}