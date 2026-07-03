// ===========================================
// VIP Number Bazar V4 Professional
// login.js
// ===========================================

import {
    auth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "./firebase.js";

// Elements
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

// Already Logged In
onAuthStateChanged(auth, (user) => {

    if (user) {
        window.location.href = "admin.html";
    }

});

// Login
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginMessage.style.color = "#ff6b6b";
    loginMessage.textContent = "Signing in...";

    try {

        await signInWithEmailAndPassword(

            auth,
            email.value.trim(),
            password.value

        );

        loginMessage.style.color = "#4CAF50";
        loginMessage.textContent = "Login Successful";

        setTimeout(() => {

            window.location.href = "admin.html";

        }, 800);

    }

    catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                loginMessage.textContent = "Invalid Email or Password";
                break;

            case "auth/user-not-found":
                loginMessage.textContent = "User Not Found";
                break;

            case "auth/wrong-password":
                loginMessage.textContent = "Wrong Password";
                break;

            case "auth/invalid-email":
                loginMessage.textContent = "Invalid Email";
                break;

            case "auth/too-many-requests":
                loginMessage.textContent = "Too Many Attempts";
                break;

            default:
                loginMessage.textContent = error.message;

        }

    }

});
