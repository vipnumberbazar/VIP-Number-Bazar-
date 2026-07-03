// =======================================
// VIP Number Bazar V4 Professional
// firebase.js
// =======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",

  authDomain: "vipnumberbazar-73e51.firebaseapp.com",

  projectId: "vipnumberbazar-73e51",

  storageBucket: "vipnumberbazar-73e51.firebasestorage.app",

  messagingSenderId: "756745745147",

  appId: "1:756745745147:web:e8dcd216eda572c440f65e",

  measurementId: "G-ZTB2EEZVQ1"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const vipNumbersRef = collection(db, "vipNumbers");

const ordersRef = collection(db, "orders");

const customersRef = collection(db, "customers");

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
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,

  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

};
