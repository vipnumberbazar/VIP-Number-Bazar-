import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
getAuth,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "તમારો apiKey",
  authDomain: "તમારો-project.firebaseapp.com",
  projectId: "તમારો-project-id",
  storageBucket: "તમારો-project.appspot.com",
  messagingSenderId: "તમારો senderId",
  appId: "તમારો appId"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").onclick = () => {

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

signInWithEmailAndPassword(auth, email, password)

.then(() => {

window.location.href = "admin.html";

})

.catch(() => {

document.getElementById("msg").innerHTML =
"❌ Email અથવા Password ખોટો છે";

});

};
