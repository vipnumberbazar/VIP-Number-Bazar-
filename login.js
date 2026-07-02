// ======================================
// VIP Number Bazar V4
// login.js
// ======================================

import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// જો પહેલેથી Login હોય તો સીધું Admin Panel
onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "admin.html";

    }

});

// Login
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    errorMsg.innerText = "";

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "admin.html";

    }

    catch (error) {

        errorMsg.innerText = "Invalid Email or Password";

    }

});
