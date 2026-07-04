// =======================================
// VIP Number Bazar V5 Professional
// login.js
// Part 1
// =======================================

import {

    auth,

    signInWithEmailAndPassword,

    onAuthStateChanged,

    sendPasswordResetEmail

} from "./firebase.js";

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const loginMessage = document.getElementById("loginMessage");

const rememberMe = document.getElementById("rememberMe");

const forgotPassword = document.getElementById("forgotPassword");

loginMessage.textContent = "";

loginBtn.disabled = false;
// =======================================
// Auto Login Check
// =======================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.replace("admin.html");

    }

});

// =======================================
// Login Form Submit
// =======================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginBtn.disabled = true;

    loginBtn.innerHTML = "Logging In...";

    loginMessage.textContent = "";

    try {

        await signInWithEmailAndPassword(

            auth,

            email.value.trim(),

            password.value

        );

        if (rememberMe.checked) {

            localStorage.setItem(

                "adminEmail",

                email.value.trim()

            );

        } else {

            localStorage.removeItem(

                "adminEmail"

            );

        }

        window.location.replace("admin.html");

    } catch (error) {

        loginBtn.disabled = false;

        loginBtn.innerHTML = "LOGIN";

        loginMessage.textContent = error.message;

    }

});
// =======================================
// Remember Me
// =======================================

const savedEmail = localStorage.getItem("adminEmail");

if (savedEmail) {

    email.value = savedEmail;

    rememberMe.checked = true;

}

// =======================================
// Forgot Password
// =======================================

forgotPassword.addEventListener("click", async () => {

    const userEmail = email.value.trim();

    if (!userEmail) {

        loginMessage.textContent =
            "Enter your email first.";

        return;

    }

    try {

        await sendPasswordResetEmail(

            auth,

            userEmail

        );

        loginMessage.style.color = "#16a34a";

        loginMessage.textContent =
            "Password reset email sent successfully.";

    } catch (error) {

        loginMessage.style.color = "#ef4444";

        loginMessage.textContent =
            error.message;

    }

});
// =======================================
// Block Back Button
// =======================================

history.pushState(null, "", location.href);

window.onpopstate = function () {

    history.go(1);

};

// =======================================
// Disable Login Page Cache
// =======================================

window.addEventListener("pageshow", (event) => {

    if (event.persisted) {

        window.location.reload();

    }

});

window.addEventListener("load", () => {

    loginBtn.disabled = false;

    loginBtn.innerHTML = "LOGIN";

});
// =======================================
// Auto Focus
// =======================================

window.addEventListener("DOMContentLoaded", () => {

    if (email.value.trim() === "") {

        email.focus();

    } else {

        password.focus();

    }

});

// =======================================
// Enter Key Navigation
// =======================================

email.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        password.focus();

    }

});

password.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        loginBtn.click();

    }

});

// =======================================
// Input Validation
// =======================================

email.addEventListener("input", () => {

    loginMessage.textContent = "";

});

password.addEventListener("input", () => {

    loginMessage.textContent = "";

});
// =======================================
// Login Security
// =======================================

let loginAttempts = 0;

const MAX_ATTEMPTS = 5;

function lockLogin() {

    loginBtn.disabled = true;

    loginBtn.innerHTML = "Locked";

    loginMessage.style.color = "#ef4444";

    loginMessage.textContent =
        "Too many failed attempts. Please wait 5 minutes.";

    setTimeout(() => {

        loginAttempts = 0;

        loginBtn.disabled = false;

        loginBtn.innerHTML = "LOGIN";

        loginMessage.textContent = "";

    }, 5 * 60 * 1000);

}

loginForm.addEventListener("submit", () => {

    loginAttempts++;

    if (loginAttempts >= MAX_ATTEMPTS) {

        lockLogin();

    }

});

// =======================================
// Connection Status
// =======================================

window.addEventListener("offline", () => {

    loginMessage.style.color = "#ef4444";

    loginMessage.textContent =
        "No Internet Connection";

});

window.addEventListener("online", () => {

    loginMessage.style.color = "#16a34a";

    loginMessage.textContent =
        "Internet Connected";

    setTimeout(() => {

        loginMessage.textContent = "";

    }, 2000);

});
// =======================================
// Final Initialization
// =======================================

window.addEventListener("DOMContentLoaded", () => {

    console.log("VIP Number Bazar V5 Login Loaded");

    loginBtn.disabled = false;

    loginBtn.innerHTML = "LOGIN";

});

// =======================================
// Prevent Multiple Login Clicks
// =======================================

let loginProcessing = false;

loginBtn.addEventListener("click", () => {

    if (loginProcessing) return;

    loginProcessing = true;

    setTimeout(() => {

        loginProcessing = false;

    }, 3000);

});

// =======================================
// Version
// =======================================

console.log("VIP Number Bazar V5 Professional");

console.log("Login Module Ready");

export {};
