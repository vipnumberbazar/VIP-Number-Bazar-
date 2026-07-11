// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// login.js Part 1
// ==========================================

import {
    auth
} from "../firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ==============================
// DOM Elements
// ==============================

const loader = document.getElementById("loader");

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const loginMessage = document.getElementById("loginMessage");

// ==============================
// Loader
// ==============================

function showLoader(){

    if(loader){

        loader.style.display="flex";

    }

}

function hideLoader(){

    if(loader){

        loader.style.display="none";

    }

}

// ==============================
// Hide Loader
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        hideLoader();

    },500);

});

console.log("login.js Part 1 Loaded");
// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// login.js Part 2
// ==========================================

// ==============================
// Login
// ==============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginMessage.innerHTML = "";

    showLoader();

    try {

        await signInWithEmailAndPassword(

            auth,

            email.value.trim(),

            password.value

        );

        loginMessage.style.color = "#00c853";

        loginMessage.innerHTML = "Login Successful...";

        setTimeout(() => {

            window.location.href = "../admin/admin.html";

        }, 1000);

    }

    catch (error) {

        hideLoader();

        loginMessage.style.color = "#ff4444";

        loginMessage.innerHTML = error.message;

        console.error(error);

    }

});

console.log("login.js Part 2 Loaded");
// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// login.js Part 3 (Final)
// ==========================================

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ==============================
// Auto Login Check
// ==============================

onAuthStateChanged(auth, (user) => {

    hideLoader();

    if (user) {

        console.log("Logged In :", user.email);

    } else {

        console.log("No User Logged In");

    }

});

// ==============================
// Logout Function
// ==============================

window.logout = async function () {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

    }

};

// ==============================
// Ready
// ==============================

console.log("VIP NUMBER BAZAR ENTERPRISE");
console.log("login.js Ready");
