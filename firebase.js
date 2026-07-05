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

const firebaseConfig = {
  apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",
  authDomain: "vipnumberbazar-73e51.firebaseapp.com",
  projectId: "vipnumberbazar-73e51",
  storageBucket: "vipnumberbazar-73e51.firebasestorage.app",
  messagingSenderId: "756745745147",
  appId: "1:756745745147:web:e8dcd216eda572c440f65e",
  measurementId: "G-ZTB2EEZVQ1"
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
