// =======================================
// VIP Number Bazar V5 Professional
// firebase.js
// Part 1
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
  setDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  onSnapshot,
  serverTimestamp,
  increment,
  writeBatch,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";
// =======================================
// Firebase Configuration
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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

// =======================================
// Collections
// =======================================

const vipNumbersRef = collection(db, "vipNumbers");

const ordersRef = collection(db, "orders");

const customersRef = collection(db, "customers");

const visitorsRef = collection(db, "visitors");

const notificationsRef = collection(db, "notifications");

const settingsRef = collection(db, "settings");

const bannersRef = collection(db, "banners");

const categoriesRef = collection(db, "categories");

const analyticsRef = collection(db, "analytics");
// =======================================
// Export Firebase App
// =======================================

export {

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

    bannersRef,

    categoriesRef,

    analyticsRef,

    collection,

    addDoc,

    getDocs,

    getDoc,

    updateDoc,

    deleteDoc,

    setDoc,

    doc,

    query,

    where,

    orderBy,

    limit,

    startAfter,

    endBefore,

    onSnapshot,

    serverTimestamp,

    increment,

    writeBatch,

    runTransaction,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged,

    createUserWithEmailAndPassword,

    updatePassword,

    updateProfile,

    sendPasswordResetEmail,

    reauthenticateWithCredential,

    EmailAuthProvider,

    ref,

    uploadBytes,

    uploadBytesResumable,

    getDownloadURL,

    deleteObject

};
// =======================================
// Authentication Helper Functions
// =======================================

export async function adminLogin(email, password) {

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

}

export async function adminLogout() {

    return await signOut(auth);

}

export function checkAdmin(callback) {

    return onAuthStateChanged(auth, callback);

}

export function currentAdmin() {

    return auth.currentUser;

}
// =======================================
// VIP Numbers Functions
// =======================================

export async function addVipNumber(data) {

    return await addDoc(vipNumbersRef, {

        number: data.number,

        price: Number(data.price),

        category: data.category,

        operator: data.operator,

        status: data.status,

        featured: data.featured || false,

        premium: data.premium || false,

        views: 0,

        createdAt: serverTimestamp()

    });

}

export async function getAllVipNumbers() {

    return await getDocs(

        query(

            vipNumbersRef,

            orderBy("createdAt", "desc")

        )

    );

}

export async function updateVipNumber(id, data) {

    return await updateDoc(

        doc(db, "vipNumbers", id),

        data

    );

}

export async function deleteVipNumber(id) {

    return await deleteDoc(

        doc(db, "vipNumbers", id)

    );

}
// =======================================
// Orders Functions
// =======================================

export async function createOrder(data) {

    return await addDoc(ordersRef, {

        customerName: data.customerName,

        mobile: data.mobile,

        whatsapp: data.whatsapp,

        vipNumber: data.vipNumber,

        price: Number(data.price),

        status: "Pending",

        paymentStatus: "Pending",

        paymentMethod: data.paymentMethod || "Online",

        transactionId: data.transactionId || "",

        screenshot: data.screenshot || "",

        note: data.note || "",

        createdAt: serverTimestamp()

    });

}

export async function getAllOrders() {

    return await getDocs(

        query(

            ordersRef,

            orderBy("createdAt", "desc")

        )

    );

}

export async function updateOrder(id, data) {

    return await updateDoc(

        doc(db, "orders", id),

        data

    );

}

export async function deleteOrder(id) {

    return await deleteDoc(

        doc(db, "orders", id)

    );

}
// =======================================
// Customers Functions
// =======================================

export async function addCustomer(data) {

    return await addDoc(customersRef, {

        name: data.name,

        mobile: data.mobile,

        whatsapp: data.whatsapp,

        city: data.city,

        state: data.state,

        email: data.email || "",

        address: data.address || "",

        totalOrders: 0,

        totalSpent: 0,

        status: "Active",

        createdAt: serverTimestamp()

    });

}

export async function getAllCustomers() {

    return await getDocs(

        query(

            customersRef,

            orderBy("createdAt", "desc")

        )

    );

}

export async function updateCustomer(id, data) {

    return await updateDoc(

        doc(db, "customers", id),

        data

    );

}

export async function deleteCustomer(id) {

    return await deleteDoc(

        doc(db, "customers", id)

    );

}
// =======================================
// Visitors & Notifications Functions
// =======================================

export async function addVisitor(data = {}) {

    return await addDoc(visitorsRef, {

        page: data.page || "Home",

        device: data.device || navigator.userAgent,

        ip: data.ip || "",

        country: data.country || "",

        city: data.city || "",

        browser: data.browser || "",

        createdAt: serverTimestamp()

    });

}

export async function addNotification(title, message) {

    return await addDoc(notificationsRef, {

        title,

        message,

        isRead: false,

        createdAt: serverTimestamp()

    });

}

export async function getNotifications() {

    return await getDocs(

        query(

            notificationsRef,

            orderBy("createdAt", "desc"),

            limit(100)

        )

    );

}

export function liveNotifications(callback) {

    return onSnapshot(

        query(

            notificationsRef,

            orderBy("createdAt", "desc")

        ),

        callback

    );

}
// =======================================
// Settings, Analytics & Backup Functions
// =======================================

export async function saveWebsiteSettings(data) {

    return await setDoc(

        doc(db, "settings", "website"),

        {

            siteName: data.siteName,

            logo: data.logo,

            whatsapp: data.whatsapp,

            email: data.email,

            address: data.address,

            instagram: data.instagram,

            facebook: data.facebook,

            youtube: data.youtube,

            theme: data.theme,

            maintenance: data.maintenance,

            updatedAt: serverTimestamp()

        },

        { merge: true }

    );

}

export async function getWebsiteSettings() {

    return await getDoc(

        doc(db, "settings", "website")

    );

}

export async function updateAnalytics(field) {

    return await updateDoc(

        doc(db, "analytics", "dashboard"),

        {

            [field]: increment(1),

            updatedAt: serverTimestamp()

        }

    );

}

export async function backupCollection(collectionName) {

    const snapshot = await getDocs(

        collection(db, collectionName)

    );

    const backup = [];

    snapshot.forEach((docItem) => {

        backup.push({

            id: docItem.id,

            ...docItem.data()

        });

    });

    return backup;

}
// =======================================
// VIP Number Bazar V5 Professional
// firebase.js
// Part 10 (Final)
// =======================================

// =======================================
// Real Time Listeners
// =======================================

export function liveVipNumbers(callback) {

    return onSnapshot(

        query(
            vipNumbersRef,
            orderBy("createdAt", "desc")
        ),

        callback

    );

}

export function liveOrders(callback) {

    return onSnapshot(

        query(
            ordersRef,
            orderBy("createdAt", "desc")
        ),

        callback

    );

}

export function liveCustomers(callback) {

    return onSnapshot(

        query(
            customersRef,
            orderBy("createdAt", "desc")
        ),

        callback

    );

}

export function liveVisitors(callback) {

    return onSnapshot(

        query(
            visitorsRef,
            orderBy("createdAt", "desc")
        ),

        callback

    );

}

// =======================================
// Dashboard Counter
// =======================================

export async function dashboardCounter() {

    const vip = await getDocs(vipNumbersRef);

    const orders = await getDocs(ordersRef);

    const customers = await getDocs(customersRef);

    const visitors = await getDocs(visitorsRef);

    return {

        totalVipNumbers: vip.size,

        totalOrders: orders.size,

        totalCustomers: customers.size,

        totalVisitors: visitors.size

    };

}

// =======================================
// Version
// =======================================

export const APP_NAME = "VIP Number Bazar";

export const APP_VERSION = "V5 Professional";

console.log(APP_NAME + " " + APP_VERSION + " Loaded");

