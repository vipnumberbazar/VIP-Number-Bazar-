import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    message.style.color = "#00ff66";
    message.textContent = "Login Successful";

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);

  } catch (error) {
    message.style.color = "red";
    message.textContent = error.message;
  }
});
