import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

export { db, auth };
