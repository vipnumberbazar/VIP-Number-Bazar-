// ===========================================
// VIP NUMBER BAZAR V6 PROFESSIONAL
// script.js
// Part 1
// Lines 1-200
// ===========================================

import{

db,

vipNumbersRef,

ordersRef,

visitorsRef,

notificationsRef,

settingsRef,

collection,

addDoc,

getDocs,

getDoc,

doc,

query,

orderBy,

where,

limit,

onSnapshot,

serverTimestamp,

increment,

updateDoc

}from "./firebase.js";

// ===========================================
// DOM
// ===========================================

const loader=document.getElementById("loader");

const vipGrid=document.getElementById("vipNumbersGrid");

const featuredGrid=document.getElementById("featuredGrid");

const premiumGrid=document.getElementById("premiumGrid");

const searchBox=document.getElementById("searchBox");

const operatorFilter=document.getElementById("operatorFilter");

const categoryFilter=document.getElementById("categoryFilter");

const totalNumbers=document.getElementById("totalNumbers");

const availableNumbers=document.getElementById("availableNumbers");

const soldNumbers=document.getElementById("soldNumbers");

const visitorCount=document.getElementById("visitorCount");

const loadingOverlay=document.getElementById("loadingOverlay");

const toast=document.getElementById("toast");

const toastText=document.getElementById("toastText");

const bookingForm=document.getElementById("bookingForm");

const scrollTopBtn=document.getElementById("scrollTopBtn");

const imageModal=document.getElementById("imageModal");

const modalImage=document.getElementById("modalImage");

const closeImageModal=document.getElementById("closeImageModal");

// ===========================================
// Loader
// ===========================================

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.display="none";

},800);

});

// ===========================================
// Toast
// ===========================================

function showToast(message){

toastText.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

// ===========================================
// Loading
// ===========================================

function startLoading(){

loadingOverlay.classList.add("active");

}

function stopLoading(){

loadingOverlay.classList.remove("active");

}

// ===========================================
// Visitor Counter
// ===========================================

async function saveVisitor(){

try{

await addDoc(

visitorsRef,

{

device:navigator.userAgent,

createdAt:serverTimestamp()

}

);

}catch(e){

console.log(e);

}

}

// ===========================================
// Dashboard Counter
// ===========================================

async function loadCounters(){

const snapshot=await getDocs(vipNumbersRef);

let total=0;

let available=0;

let sold=0;

snapshot.forEach((item)=>{

const data=item.data();

if(data.deleted===true)return;

total++;

if(data.status==="Available")available++;

if(data.status==="Sold")sold++;

});

totalNumbers.textContent=total;

availableNumbers.textContent=available;

soldNumbers.textContent=sold;

}

saveVisitor();

loadCounters();
// ===========================================
// Load VIP Numbers
// ===========================================

async function loadVipNumbers(){

vipGrid.innerHTML="";

const snapshot=await getDocs(

query(

vipNumbersRef,

orderBy("createdAt","desc")

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

if(data.deleted===true)return;

const search=searchBox.value.toLowerCase();

const operator=operatorFilter.value;

const category=categoryFilter.value;

if(

search!=="" &&

!String(data.number)

.toLowerCase()

.includes(search)

)return;

if(

operator!=="All" &&

data.operator!==operator

)return;

if(

category!=="All" &&

data.category!==category

)return;

vipGrid.innerHTML+=`

<div class="vip-card fade">

<div class="vip-image">

<img src="${data.image||'logo.png'}">

</div>

<div class="vip-content">

<div class="vip-number">

${data.number}

</div>

<div class="vip-price">

₹${Number(data.price).toLocaleString()}

</div>

<div class="vip-meta">

<span>

${data.operator}

</span>

<span>

${data.category}

</span>

</div>

<div class="vip-meta">

<span class="status ${String(data.status).toLowerCase()}">

${data.status}

</span>

<span>

👁 ${data.views||0}

</span>

</div>

<div class="vip-actions">

<button

class="buy-btn"

onclick="bookVip(

'${docItem.id}',

'${data.number}',

'${data.price}'

)">

Book Now

</button>

<button

class="whatsapp-btn"

onclick="openWhatsapp(

'${data.number}',

'${data.price}'

)">

WhatsApp

</button>

</div>

</div>

</div>

`;

});

}

// ===========================================
// Featured Numbers
// ===========================================

async function loadFeatured(){

featuredGrid.innerHTML="";

const snapshot=await getDocs(

query(

vipNumbersRef,

where("featured","==",true),

orderBy("createdAt","desc"),

limit(8)

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

if(data.deleted===true)return;

featuredGrid.innerHTML+=`

<div class="vip-card">

<div class="vip-image">

<img src="${data.image||'logo.png'}">

</div>

<div class="vip-content">

<div class="vip-number">

${data.number}

</div>

<div class="vip-price">

₹${Number(data.price).toLocaleString()}

</div>

<span class="badge featured">

Featured

</span>

</div>

</div>

`;

});

}
// ===========================================
// Premium VIP Numbers
// ===========================================

async function loadPremium(){

premiumGrid.innerHTML="";

const snapshot=await getDocs(

query(

vipNumbersRef,

where("category","==","Premium"),

orderBy("createdAt","desc"),

limit(12)

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

if(data.deleted===true)return;

premiumGrid.innerHTML+=`

<div class="vip-card fade">

<div class="vip-image">

<img src="${data.image||'logo.png'}">

</div>

<div class="vip-content">

<div class="vip-number">

${data.number}

</div>

<div class="vip-price">

₹${Number(data.price).toLocaleString()}

</div>

<div class="vip-meta">

<span>${data.operator}</span>

<span>${data.category}</span>

</div>

<div class="vip-actions">

<button

class="buy-btn"

onclick="bookVip(

'${docItem.id}',

'${data.number}',

'${data.price}'

)">

Book Now

</button>

<button

class="whatsapp-btn"

onclick="openWhatsapp(

'${data.number}',

'${data.price}'

)">

WhatsApp

</button>

</div>

</div>

</div>

`;

});

}

// ===========================================
// Search & Filter
// ===========================================

searchBox.addEventListener(

"input",

loadVipNumbers

);

operatorFilter.addEventListener(

"change",

loadVipNumbers

);

categoryFilter.addEventListener(

"change",

loadVipNumbers

);

// ===========================================
// Book VIP
// ===========================================

window.bookVip=function(

id,

number,

price

){

document.getElementById(

"selectedVipNumber"

).value=number;

document.getElementById(

"selectedPrice"

).value=price;

window.scrollTo({

top:document.getElementById(

"contact"

).offsetTop-80,

behavior:"smooth"

});

showToast(

"Selected VIP Number"

);

updateDoc(

doc(

db,

"vipNumbers",

id

),

{

views:increment(1)

}

).catch(()=>{});

};

// ===========================================
// WhatsApp
// ===========================================

window.openWhatsapp=function(

number,

price

){

const message=

`Hello VIP Number Bazar,

I want this VIP Number

${number}

Price ₹${price}`;

window.open(

"https://wa.me/918070424242?text="+

encodeURIComponent(message),

"_blank"

);

};

// ===========================================
// Load All
// ===========================================

loadVipNumbers();

loadFeatured();

loadPremium();
// ===========================================
// Booking Form
// ===========================================

bookingForm.addEventListener("submit",async(e)=>{

e.preventDefault();

startLoading();

try{

const customerName=document.getElementById("customerName").value.trim();

const customerMobile=document.getElementById("customerMobile").value.trim();

const customerMessage=document.getElementById("customerMessage").value.trim();

const vipNumber=document.getElementById("selectedVipNumber").value;

const vipPrice=document.getElementById("selectedPrice").value;

await addDoc(

ordersRef,

{

customerName,

mobile:customerMobile,

message:customerMessage,

vipNumber,

price:Number(vipPrice),

status:"Pending",

paymentStatus:"Pending",

createdAt:serverTimestamp()

}

);

showToast("Booking Submitted");

bookingForm.reset();

}catch(error){

console.log(error);

showToast("Booking Failed");

}

stopLoading();

});

// ===========================================
// Image Preview
// ===========================================

window.openImage=function(src){

modalImage.src=src;

imageModal.classList.add("active");

};

closeImageModal.addEventListener("click",()=>{

imageModal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

if(e.target===imageModal){

imageModal.classList.remove("active");

}

});

// ===========================================
// Scroll Button
// ===========================================

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

});

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ===========================================
// Realtime Update
// ===========================================

onSnapshot(vipNumbersRef,()=>{

loadCounters();

loadVipNumbers();

loadFeatured();

loadPremium();

});

// ===========================================
// Notification
// ===========================================

onSnapshot(

query(

notificationsRef,

orderBy("createdAt","desc"),

limit(10)

),

(snapshot)=>{

const list=document.getElementById("notificationPopupList");

if(!list)return;

list.innerHTML="";

snapshot.forEach((docItem)=>{

const data=docItem.data();

list.innerHTML+=`

<div class="notification-item">

<h4>${data.title||"Notification"}</h4>

<p>${data.message||""}</p>

</div>

`;

});

}

);
// ===========================================
// Settings Loader
// ===========================================

async function loadSettings(){

try{

const settingsDoc=await getDoc(

doc(

db,

"settings",

"website"

)

);

if(settingsDoc.exists()){

const data=settingsDoc.data();

document.title=data.siteName||"VIP NUMBER BAZAR";

const whatsappLink=document.getElementById("floatingWhatsappLink");

if(whatsappLink){

whatsappLink.href="https://wa.me/91"+(data.whatsapp||"8070424242");

}

}

}catch(error){

console.log(error);

}

}

// ===========================================
// Visitor Counter
// ===========================================

onSnapshot(

visitorsRef,

(snapshot)=>{

visitorCount.textContent=snapshot.size;

}

);

// ===========================================
// Auto Refresh
// ===========================================

setInterval(()=>{

loadCounters();

loadVipNumbers();

loadFeatured();

loadPremium();

},30000);

// ===========================================
// Notification Popup
// ===========================================

const notificationPopup=

document.getElementById(

"notificationPopup"

);

const closeNotificationPopup=

document.getElementById(

"closeNotificationPopup"

);

if(closeNotificationPopup){

closeNotificationPopup.addEventListener(

"click",

()=>{

notificationPopup.classList.remove(

"active"

);

}

);

}

// ===========================================
// Keyboard Shortcut
// ===========================================

document.addEventListener(

"keydown",

(e)=>{

if(e.key==="Escape"){

imageModal.classList.remove("active");

notificationPopup.classList.remove("active");

}

}

// ===========================================
// Initialize
// ===========================================

loadSettings();

loadCounters();

loadVipNumbers();

loadFeatured();

loadPremium();

// ===========================================
// Export
// ===========================================

window.showToast=showToast;

window.loadVipNumbers=loadVipNumbers;

window.loadFeatured=loadFeatured;

window.loadPremium=loadPremium;

window.loadCounters=loadCounters;

// ===========================================
// Version
// ===========================================

const APP_NAME="VIP NUMBER BAZAR";

const APP_VERSION="V6 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Website Module Ready");

// ===========================================
// End Of File
// ===========================================

export{};
