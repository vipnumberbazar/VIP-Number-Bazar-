import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.getElementById("loginBtn").onclick = async function () {

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {

    await signInWithEmailAndPassword(auth, email, password);

    sessionStorage.setItem("adminLogin", "true");

    window.location.href = "admin.html";

  } catch (error) {

    document.getElementById("msg").innerHTML =
      "❌ Email અથવા Password ખોટો છે";

  }

};
