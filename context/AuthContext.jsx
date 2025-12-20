import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// 1. Initialize Firebase App securely
// We check if a config is provided via the environment variable or fallback to a placeholder
// to prevent "No Firebase App '[DEFAULT]'" errors.
let auth;
try {
  if (typeof __firebase_config !== 'undefined') {
    const firebaseConfig = JSON.parse(__firebase_config);
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    // Fallback or development mock if config is missing
    // Ideally this should not happen in the preview environment
    console.warn("Firebase config missing. Auth features may not work.");
  }
} catch (error) {
  // If app is already initialized, just getAuth
  try {
      auth = getAuth();
  } catch (e) {
      console.error("Firebase init error:", e);
  }
}

// 2. Create Context
export const AuthContext = createContext({
  currentUser: null,
  loading: true,
  login: () => {},
  logout: () => {},
  signup: () => {},
  signInWithGoogle: () => {}
});

// 3. Create Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication functions
  const signup = (email, password) => {
    return auth ? createUserWithEmailAndPassword(auth, email, password) : Promise.reject("Auth not initialized");
  };

  const login = (email, password) => {
    return auth ? signInWithEmailAndPassword(auth, email, password) : Promise.reject("Auth not initialized");
  };

  const logout = () => {
    return auth ? signOut(auth) : Promise.reject("Auth not initialized");
  };

  const loginAnonymously = () => {
      return auth ? signInAnonymously(auth) : Promise.reject("Auth not initialized");
  }

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user: currentUser, // Expose as 'user' to match useAuth expectation
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginAnonymously
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;