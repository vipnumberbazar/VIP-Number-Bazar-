import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",
  authDomain: "vipnumberbazar-73e51.firebaseapp.com",
  projectId: "vipnumberbazar-73e51",
  storageBucket: "vipnumberbazar-73e51.firebasestorage.app",
  messagingSenderId: "756745745147",
  appId: "1:756745745147:web:e8dcd216eda572c440f65e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {}
);

const allowedNumber = "+916354312829";

// =======================
// Send OTP
// =======================

document.getElementById("sendOtp").onclick = async () => {

  const phoneNumber = allowedNumber;

  try {

    const confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

    window.confirmationResult = confirmationResult;

    alert("OTP મોકલાઈ ગયો.");

  } catch (error) {

    alert(error.message);

  }

};

// =======================
// Verify OTP
// =======================

document.getElementById("verifyOtp").onclick = async () => {

  const code = document.getElementById("otp").value;

  try {

    await window.confirmationResult.confirm(code);

    alert("Login Successful");

    window.location.href = "admin.html";

  } catch (error) {

    alert("ખોટો OTP");

  }

};
