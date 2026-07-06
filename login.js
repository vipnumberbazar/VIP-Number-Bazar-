import {
auth,
signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence,
browserSessionPersistence
} from "./firebase.js";

const loader = document.getElementById("loader");
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const loginMessage = document.getElementById("loginMessage");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
});

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginMessage.innerHTML = "";

    try {

        await setPersistence(
            auth,
            rememberMe.checked
                ? browserLocalPersistence
                : browserSessionPersistence
        );

        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        window.location.href = "admin.html";

    } catch (error) {

        loginMessage.innerHTML = error.message;

    }

});
