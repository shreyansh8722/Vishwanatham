import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
// FIX: Change 'firebase/doc' to 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from "../lib/firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          // Fetch the user document from the 'users' collection
          const userDocRef = doc(db, "users", u.uid);
          const userDoc = await getDoc(userDocRef);
          
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          // Merge Auth data with the role from Firestore
          setUser({
            ...u,
            role: userData.role || 'user' 
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser({ ...u, role: 'user' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}