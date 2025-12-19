import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase'; // Ensure auth is imported
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // If Guest: Load from LocalStorage
        const saved = localStorage.getItem('cart');
        setCart(saved ? JSON.parse(saved) : []);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // 2. Database Sync Logic (The "Premium" Feature)
  useEffect(() => {
    let unsubFirestore = () => {};

    const syncCart = async () => {
      if (user) {
        // A. User just logged in. Check if we need to merge Local Cart -> DB Cart
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const userCartRef = doc(db, 'users', user.uid);
        
        if (localCart.length > 0) {
          // Fetch existing DB cart to merge
          const snap = await getDoc(userCartRef);
          const dbCart = snap.exists() ? (snap.data().cart || []) : [];
          
          // MERGE LOGIC: Combine counts for same items, add new ones
          const mergedCart = [...dbCart];
          
          localCart.forEach(localItem => {
            const index = mergedCart.findIndex(dbItem => dbItem.id === localItem.id && getOptionsKey(dbItem.selectedOptions) === getOptionsKey(localItem.selectedOptions));
            if (index > -1) {
              mergedCart[index].quantity += localItem.quantity;
            } else {
              mergedCart.push(localItem);
            }
          });

          // Save merged cart to DB and clear local
          await setDoc(userCartRef, { cart: mergedCart }, { merge: true });
          localStorage.removeItem('cart');
        }

        // B. Real-time Listener: Keep App in sync with DB
        unsubFirestore = onSnapshot(userCartRef, (doc) => {
          if (doc.exists()) {
            setCart(doc.data().cart || []);
          } else {
            setCart([]);
          }
          setLoading(false);
        });
      }
    };

    if (user) {
      syncCart();
    }

    return () => unsubFirestore();
  }, [user]);

  // 3. Save to LocalStorage (Guest Only)
  useEffect(() => {
    if (!user && !loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user, loading]);

  // --- HELPER: Save changes to DB or Local ---
  const saveCart = async (newCart) => {
    setCart(newCart);
    if (user) {
      const userCartRef = doc(db, 'users', user.uid);
      await setDoc(userCartRef, { cart: newCart }, { merge: true });
    }
  };

  const getOptionsKey = (options) => {
    if (!options || typeof options !== 'object') return "{}";
    const validOptions = Object.keys(options)
      .filter(key => options[key])
      .sort()
      .reduce((obj, key) => {
        obj[key] = options[key];
        return obj;
      }, {});
    return JSON.stringify(validOptions);
  };

  // --- ACTIONS ---
  const addToCart = (product) => {
    const productOptionsKey = getOptionsKey(product.selectedOptions);
    
    // Logic: Check duplicates based on ID + Options
    const existingItemIndex = cart.findIndex(
      (item) => 
        String(item.id) === String(product.id) && 
        getOptionsKey(item.selectedOptions) === productOptionsKey
    );

    let newCart;
    if (existingItemIndex > -1) {
      newCart = [...cart];
      newCart[existingItemIndex].quantity += (product.quantity || 1);
    } else {
      newCart = [...cart, { 
        ...product, 
        quantity: product.quantity || 1, 
        selectedOptions: product.selectedOptions || {},
        _cartId: Date.now() + Math.random().toString(36).substr(2, 9) 
      }];
    }
    
    saveCart(newCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    const newCart = cart.filter((item) => (item._cartId || item.id) !== cartId);
    saveCart(newCart);
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map((item) => 
      (item._cartId === cartId || (!item._cartId && item.id === cartId))
        ? { ...item, quantity: newQuantity } 
        : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};