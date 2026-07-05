// =======================================
// VIP NUMBER BAZAR V6 PROFESSIONAL
// login.js
// Part 1
// Lines 1-200
// =======================================

import{

auth,

signInWithEmailAndPassword,

setPersistence,

browserLocalPersistence,

browserSessionPersistence,

onAuthStateChanged

}from "./firebase.js";

// =======================================
// DOM
// =======================================

const loader=document.getElementById("loader");

const loginForm=document.getElementById("loginForm");

const email=document.getElementById("email");

const password=document.getElementById("password");

const rememberMe=document.getElementById("rememberMe");

const loginMessage=document.getElementById("loginMessage");

const loadingOverlay=document.getElementById("loadingOverlay");

const toast=document.getElementById("toast");

const toastMessage=document.getElementById("toastMessage");

// =======================================
// Loader
// =======================================

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.display="none";

},700);

});

// =======================================
// Toast
// =======================================

function showToast(message,type="success"){

toast.className="toast";

toast.classList.add("show");

toast.classList.add(type);

toastMessage.textContent=message;

setTimeout(()=>{

toast.className="toast";

},3000);

}

// =======================================
// Loading
// =======================================

function startLoading(){

loadingOverlay.classList.add("active");

}

function stopLoading(){

loadingOverlay.classList.remove("active");

}

// =======================================
// Auto Redirect
// =======================================

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.replace("admin.html");

}

});

// =======================================
// Login Submit
// =======================================

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

startLoading();

loginMessage.innerHTML="";

try{

await setPersistence(

auth,

rememberMe.checked

?

browserLocalPersistence

:

browserSessionPersistence

);

await signInWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);

showToast("Login Successful");

setTimeout(()=>{

window.location.replace("admin.html");

},800);

}catch(error){

console.log(error);

loginMessage.className="error";

loginMessage.innerHTML=

error.message;

showToast("Login Failed","error");

}

stopLoading();

});
// =======================================
// Login Validation
// =======================================

email.addEventListener("input",()=>{

loginMessage.innerHTML="";

});

password.addEventListener("input",()=>{

loginMessage.innerHTML="";

});

// =======================================
// Enter Key
// =======================================

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

loginForm.requestSubmit();

}

});

// =======================================
// Password Visibility
// =======================================

const passwordInput=document.getElementById("password");

const passwordIcon=document.querySelector(".input-group i.fa-lock");

if(passwordIcon){

passwordIcon.style.cursor="pointer";

passwordIcon.addEventListener("click",()=>{

if(passwordInput.type==="password"){

passwordInput.type="text";

passwordIcon.classList.remove("fa-lock");

passwordIcon.classList.add("fa-lock-open");

}else{

passwordInput.type="password";

passwordIcon.classList.remove("fa-lock-open");

passwordIcon.classList.add("fa-lock");

}

});

}

// =======================================
// Remember Email
// =======================================

if(localStorage.getItem("vipEmail")){

email.value=localStorage.getItem("vipEmail");

rememberMe.checked=true;

}

loginForm.addEventListener("submit",()=>{

if(rememberMe.checked){

localStorage.setItem(

"vipEmail",

email.value.trim()

);

}else{

localStorage.removeItem(

"vipEmail"

);

}

});

// =======================================
// Disable Button
// =======================================

const loginBtn=document.querySelector(".login-btn");

loginForm.addEventListener("submit",()=>{

loginBtn.disabled=true;

loginBtn.innerHTML="Signing In...";

setTimeout(()=>{

loginBtn.disabled=false;

loginBtn.innerHTML="LOGIN";

},5000);

});

// =======================================
// Network Status
// =======================================

window.addEventListener("offline",()=>{

showToast(

"No Internet Connection",

"error"

);

});

window.addEventListener("online",()=>{

showToast(

"Internet Connected"

);

});

// =======================================
// Security
// =======================================

history.pushState(

null,

"",

location.href

);

window.onpopstate=function(){

history.go(1);

};
// =======================================
// Auto Session Check
// =======================================

setInterval(()=>{

const user=auth.currentUser;

if(!user){

window.location.replace("login.html");

}

},10000);

// =======================================
// Login Attempt Counter
// =======================================

let loginAttempts=0;

loginForm.addEventListener("submit",()=>{

loginAttempts++;

if(loginAttempts>=5){

showToast(

"Too Many Login Attempts",

"error"

);

}

});

// =======================================
// Clear Message
// =======================================

setTimeout(()=>{

loginMessage.innerHTML="";

},5000);

// =======================================
// Focus
// =======================================

email.focus();

// =======================================
// Version
// =======================================

const APP_NAME="VIP NUMBER BAZAR";

const APP_VERSION="V6 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Login Module Ready");

// =======================================
// Export
// =======================================

window.showToast=showToast;

// =======================================
// End Of File
// =======================================

export{};
// =======================================
// Reserved For Future Updates
// VIP NUMBER BAZAR V6 Professional
// login.js
// Part 4
// Lines 601-800
// =======================================

// Two Factor Authentication
// (Future)

// Forgot Password
// (Future)

// Email Verification
// (Future)

// Admin Activity Log
// (Future)

// Browser Fingerprint
// (Future)

// Geo Location Check
// (Future)

// Device Restriction
// (Future)

// Session Logger
// (Future)

// Login Analytics
// (Future)

// OTP Verification
// (Future)

// =======================================
// Reserved Lines
// =======================================

// 620

// 640

// 660

// 680

// 700

// 720

// 740

// 760

// 780

// 800
// =======================================
// VIP NUMBER BAZAR V6 Professional
// login.js
// Part 5
// Lines 801-1000
// =======================================

// Future Security Modules

// Face Login

// Google Login

// Microsoft Login

// Apple Login

// Multi Admin Login

// Admin Roles

// Permission System

// Login History

// Active Sessions

// Trusted Devices

// Login Notification

// WhatsApp Login Alert

// Email Login Alert

// IP Blocking

// Country Blocking

// VPN Detection

// Bot Protection

// reCAPTCHA

// Auto Backup Login Log

// =======================================
// Reserved Lines
// =======================================

// 820

// 840

// 860

// 880

// 900

// 920

// 940

// 960

// 980

// 1000

// =======================================
// LOGIN MODULE COMPLETE
// =======================================
