import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
// FIX: Import from local file
import { useAuth } from './useAuth'; 
import { useLoginModal } from '../context/LoginModalContext'; 
import toast from 'react-hot-toast';

export function useFavorites() {
  const { user } = useAuth();
  // ... (rest of your code remains the same)
  // ...
  // ...
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) { setFavorites([]); return; }
    const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) setFavorites(docSnap.data().favorites?.map(String) || []);
    });
    return () => unsub();
  }, [user]);

  const toggleFavorite = async (product) => {
    // ... (keep your existing toggle logic)
    const pid = String(product?.id || product);
    if (!user) return; // Add login modal trigger here if needed
    
    const ref = doc(db, 'users', user.uid);
    try {
      if (favorites.includes(pid)) {
        await updateDoc(ref, { favorites: arrayRemove(pid) });
        toast.success("Removed");
      } else {
        await setDoc(ref, { favorites: arrayUnion(pid) }, { merge: true });
        toast.success("Added");
      }
    } catch (e) { console.error(e); }
  };

  return { favorites, isFavorite: (id) => favorites.includes(String(id)), toggleFavorite };
}