import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0BuEfY_MLrRCcgb-P2zrZSYjcqnRAsd8",
  authDomain: "rajscapemedicinetracker.firebaseapp.com",
  projectId: "rajscapemedicinetracker",
  storageBucket: "rajscapemedicinetracker.appspot.com",
  messagingSenderId: "353915476916",
  appId: "1:353915476916:web:abc7b1c3fc992b091130e1",
  measurementId: "G-74QKD58V6N",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);
