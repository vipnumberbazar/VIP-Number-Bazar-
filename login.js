// ===============================
// VIP Number Bazar V4
// login.js
// ===============================

import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.style.color = "#d4af37";
    message.innerHTML = "Logging in...";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        message.style.color = "#00ff99";
        message.innerHTML = "Login Successful";

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);

    } catch (error) {

        message.style.color = "#ff4d4d";
        message.innerHTML = error.message;

    }

});
