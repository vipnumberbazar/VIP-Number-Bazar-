// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// firebase.js Part 1
// ==========================================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Auth
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ==========================================
// Firebase Config
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",
    authDomain: "vipnumberbazar-73e51.firebaseapp.com",
    projectId: "vipnumberbazar-73e51",
    storageBucket: "vipnumberbazar-73e51.firebasestorage.app",
    messagingSenderId: "756745745147",
    appId: "1:756745745147:web:e8dcd216eda572c440f65e",
    measurementId: "G-ZTB2EEZVQ1"
};

// ==========================================
// Initialize Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// ==========================================
// Collections
// ==========================================

const vipNumbersRef = collection(db, "vipNumbers");
const ordersRef = collection(db, "orders");
const customersRef = collection(db, "customers");
const visitorsRef = collection(db, "visitors");
const notificationsRef = collection(db, "notifications");
const settingsRef = collection(db, "settings");
// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// firebase.js Part 2 (Final)
// ==========================================

// Export

export {

    app,

    db,

    auth,

    vipNumbersRef,

    ordersRef,

    customersRef,

    visitorsRef,

    notificationsRef,

    settingsRef,

    collection,

    getDocs,

    addDoc,

    updateDoc,

    deleteDoc,

    doc,

    serverTimestamp

};

// ==========================================
// App Information
// ==========================================

export const APP_NAME = "VIP NUMBER BAZAR";

export const APP_VERSION = "ENTERPRISE v1.0";

console.log(APP_NAME);
console.log(APP_VERSION);
console.log("Firebase Connected Successfully");
