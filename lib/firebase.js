// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyAwlJHTqOJJ0SVBnCicstazRD59vNHeZq0",
  authDomain: "vishwanatham-b6f1a.firebaseapp.com",
  projectId: "vishwanatham-b6f1a",
  storageBucket: "vishwanatham-b6f1a.firebasestorage.app",
  messagingSenderId: "79662170500",
  appId: "1:79662170500:web:cb18b80ccc4b8f522b5dd1",
  measurementId: "G-4L1FN6YKR4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
