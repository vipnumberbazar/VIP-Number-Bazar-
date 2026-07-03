// ===============================
// VIP Number Bazar V4 Professional
// firebase.js
// Firebase SDK v12
// ===============================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Authentication
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ========================================
// YOUR FIREBASE CONFIG
// Replace with your own Firebase project
// ========================================

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_PROJECT.firebaseapp.com",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_PROJECT.appspot.com",

  messagingSenderId: "YOUR_SENDER_ID",

  appId: "YOUR_APP_ID"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firestore

const db = getFirestore(app);


// Authentication

const auth = getAuth(app);


// Collections

const vipNumbersRef = collection(db, "vipNumbers");

const ordersRef = collection(db, "orders");

const customersRef = collection(db, "customers");


// Export Everything

export {

  db,
  auth,

  vipNumbersRef,
  ordersRef,
  customersRef,

  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,

  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

};
