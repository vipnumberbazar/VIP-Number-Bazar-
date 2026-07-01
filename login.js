import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  msg.innerHTML = "";

  if (!email || !password) {
    msg.innerHTML = "⚠️ Email અને Password ભરો";
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    sessionStorage.setItem("adminLogin", "true");

    window.location.href = "admin.html";

  } catch (error) {

    msg.innerHTML = error.message;

  }

});
