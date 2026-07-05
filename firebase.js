// =======================================
// VIP NUMBER BAZAR V6 PROFESSIONAL
// firebase.js
// Part 1
// =======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
doc,
addDoc,
setDoc,
getDoc,
getDocs,
updateDoc,
deleteDoc,
query,
where,
orderBy,
limit,
onSnapshot,
serverTimestamp,
increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
setPersistence,
browserLocalPersistence,
browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL,
deleteObject
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// =======================================
// Firebase Config
// =======================================

const firebaseConfig={

apiKey:"YOUR_API_KEY",

authDomain:"YOUR_PROJECT.firebaseapp.com",

projectId:"YOUR_PROJECT_ID",

storageBucket:"YOUR_PROJECT.firebasestorage.app",

messagingSenderId:"YOUR_SENDER_ID",

appId:"YOUR_APP_ID"

};

// =======================================
// Initialize Firebase
// =======================================

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

const auth=getAuth(app);

const storage=getStorage(app);

// =======================================
// Collections
// =======================================

const vipNumbersRef=collection(db,"vipNumbers");

const ordersRef=collection(db,"orders");

const customersRef=collection(db,"customers");

const visitorsRef=collection(db,"visitors");

const notificationsRef=collection(db,"notifications");

const settingsRef=collection(db,"settings");
// =======================================
// Export Firebase Objects
// =======================================

export{

app,

db,

auth,

storage,

vipNumbersRef,

ordersRef,

customersRef,

visitorsRef,

notificationsRef,

settingsRef,

collection,

doc,

addDoc,

setDoc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

query,

where,

orderBy,

limit,

onSnapshot,

serverTimestamp,

increment,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged,

setPersistence,

browserLocalPersistence,

browserSessionPersistence,

ref,

uploadBytes,

getDownloadURL,

deleteObject

};

// =======================================
// App Information
// =======================================

export const APP_NAME="VIP NUMBER BAZAR";

export const APP_VERSION="V6 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Firebase Connected");

// =======================================
// End Of File
// =======================================
