// =======================================
// VIP Number Bazar V5 Professional
// script.js
// Part 1
// =======================================

import {

db,

vipNumbersRef,

ordersRef,

customersRef,

visitorsRef,

collection,

addDoc,

getDocs,

query,

orderBy,

where,

doc,

updateDoc,

increment,

serverTimestamp,

onSnapshot

} from "./firebase.js";

const loader=document.getElementById("loader");

const vipGrid=document.getElementById("vipNumbersGrid");

const premiumGrid=document.getElementById("premiumGrid");

const featuredGrid=document.getElementById("featuredGrid");

const searchInput=document.getElementById("searchInput");

const operatorFilter=document.getElementById("operatorFilter");

const categoryFilter=document.getElementById("categoryFilter");

const bookingForm=document.getElementById("bookingForm");

const loadingOverlay=document.getElementById("loadingOverlay");

const toast=document.getElementById("toast");

const toastText=document.getElementById("toastText");
// =======================================
// Initial Load
// =======================================

document.addEventListener("DOMContentLoaded",async()=>{

loader.style.display="flex";

await loadVipNumbers();

await loadCounters();

await saveVisitor();

loader.style.display="none";

});

// =======================================
// Load VIP Numbers
// =======================================

async function loadVipNumbers(){

vipGrid.innerHTML="";

premiumGrid.innerHTML="";

featuredGrid.innerHTML="";

const snapshot=await getDocs(

query(

vipNumbersRef,

orderBy("createdAt","desc")

)

);

snapshot.forEach(docItem=>{

const data=docItem.data();

createVipCard(docItem.id,data);

});

}

// =======================================
// Create VIP Card
// =======================================

function createVipCard(id,data){

const card=createCard(id,data);

vipGrid.appendChild(card);

if(data.category==="Premium"){

premiumGrid.appendChild(

createCard(id,data)

);

}

if(data.featured===true){

featuredGrid.appendChild(

createCard(id,data)

);

}

}
// =======================================
// Create Card
// =======================================

function createCard(id,data){

const card=document.createElement("div");

card.className="vip-card";

card.innerHTML=`

<img
class="vip-image"
src="${data.image||'logo.png'}"
alt="VIP">

<div class="vip-content">

<div class="vip-number">

${data.number}

</div>

<div class="vip-price">

₹${Number(data.price||0).toLocaleString()}

</div>

<div class="vip-details">

<span>

${data.operator}

</span>

<span class="vip-status ${String(data.status).toLowerCase()}">

${data.status}

</span>

</div>

<a
href="#contact"
class="buy-btn"
onclick="selectVip('${id}')">

Book Now

</a>

</div>

`;

return card;

}

// =======================================
// Select VIP
// =======================================

window.selectVip=function(id){

document.getElementById("selectedVipNumber").value=id;

document.getElementById("contact").scrollIntoView({

behavior:"smooth"

});

};
// =======================================
// Booking Form
// =======================================

bookingForm.addEventListener("submit",async(e)=>{

e.preventDefault();

loadingOverlay.classList.add("show");

const order={

customerName:document.getElementById("customerName").value,

mobile:document.getElementById("customerMobile").value,

vipNumber:document.getElementById("selectedVipNumber").value,

price:document.getElementById("selectedPrice").value,

message:document.getElementById("customerMessage").value,

status:"Pending",

paymentStatus:"Pending",

createdAt:serverTimestamp()

};

try{

await addDoc(

ordersRef,

order

);

showToast(

"Booking Submitted"

);

bookingForm.reset();

}catch(error){

console.error(error);

showToast(

"Booking Failed",

"error"

);

}

loadingOverlay.classList.remove("show");

});

// =======================================
// Save Customer
// =======================================

async function saveCustomer(data){

await addDoc(

customersRef,

{

...data,

createdAt:serverTimestamp()

}

);

}
// =======================================
// Save Customer + Visitor
// =======================================

bookingForm.addEventListener("submit",async()=>{

await saveCustomer({

name:document.getElementById("customerName").value,

mobile:document.getElementById("customerMobile").value,

whatsapp:document.getElementById("customerMobile").value,

city:"",

totalOrders:1,

totalSpent:Number(

document.getElementById("selectedPrice").value||0

),

status:"Active"

});

});

async function saveVisitor(){

await addDoc(

visitorsRef,

{

device:navigator.platform,

browser:navigator.userAgent,

country:"Unknown",

city:"Unknown",

ip:"Hidden",

createdAt:serverTimestamp()

}

);

}
// =======================================
// Counters
// =======================================

async function loadCounters(){

const vipSnapshot=await getDocs(vipNumbersRef);

let total=0;

let available=0;

let sold=0;

vipSnapshot.forEach(docItem=>{

const data=docItem.data();

total++;

if(data.status==="Available"){

available++;

}else{

sold++;

}

});

document.getElementById("totalNumbers").textContent=total;

document.getElementById("availableCount").textContent=available;

document.getElementById("soldCount").textContent=sold;

const visitorSnapshot=await getDocs(visitorsRef);

document.getElementById("visitorCount").textContent=

visitorSnapshot.size;

}

// =======================================
// Realtime Update
// =======================================

onSnapshot(vipNumbersRef,()=>{

loadVipNumbers();

loadCounters();

});
// =======================================
// Search & Filter
// =======================================

function filterVipCards(){

const keyword=searchInput.value.toLowerCase();

const operator=operatorFilter.value;

const category=categoryFilter.value;

document.querySelectorAll(".vip-card").forEach(card=>{

const text=card.innerText.toLowerCase();

const operatorMatch=

operator==="All"||

text.includes(operator.toLowerCase());

const categoryMatch=

category==="All"||

text.includes(category.toLowerCase());

const searchMatch=

text.includes(keyword);

if(searchMatch&&operatorMatch&&categoryMatch){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

searchInput.addEventListener(

"input",

filterVipCards

);

operatorFilter.addEventListener(

"change",

filterVipCards

);

categoryFilter.addEventListener(

"change",

filterVipCards

);
// =======================================
// WhatsApp Booking
// =======================================

const whatsappButton=

document.getElementById(

"whatsappButton"

);

bookingForm.addEventListener(

"submit",

()=>{

const name=

document.getElementById(

"customerName"

).value;

const mobile=

document.getElementById(

"customerMobile"

).value;

const number=

document.getElementById(

"selectedVipNumber"

).value;

const price=

document.getElementById(

"selectedPrice"

).value;

const text=

`Hello VIP Number Bazar

Name : ${name}

Mobile : ${mobile}

VIP Number : ${number}

Price : ₹${price}`;

const url=

`https://wa.me/?text=${encodeURIComponent(text)}`;

whatsappButton.href=url;

document.getElementById(

"floatingWhatsappLink"

).href=url;

});
// =======================================
// Image Preview
// =======================================

const imageModal=

document.getElementById(

"imageModal"

);

const modalImage=

document.getElementById(

"modalImage"

);

const closeImageModal=

document.getElementById(

"closeImageModal"

);

window.previewImage=function(src){

modalImage.src=src;

imageModal.classList.add(

"show"

);

};

closeImageModal.addEventListener(

"click",

()=>{

imageModal.classList.remove(

"show"

);

}

);

imageModal.addEventListener(

"click",

(e)=>{

if(e.target===imageModal){

imageModal.classList.remove(

"show"

);

}

});
// =======================================
// Toast + Loading
// =======================================

function showToast(message,type="success"){

toast.className="toast";

if(type!=="success"){

toast.classList.add(type);

}

toastText.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

function showLoading(){

loadingOverlay.classList.add("show");

}

function hideLoading(){

loadingOverlay.classList.remove("show");

}

// =======================================
// Scroll To Top
// =======================================

const scrollTopBtn=

document.getElementById(

"scrollTopBtn"

);

window.addEventListener(

"scroll",

()=>{

if(window.scrollY>300){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

}

);

scrollTopBtn.addEventListener(

"click",

()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
// =======================================
// Settings Load
// =======================================

async function loadSettings(){

const snapshot=await getDocs(

collection(db,"settings")

);

snapshot.forEach(docItem=>{

const data=docItem.data();

document.getElementById(

"contactWhatsapp"

).textContent=data.whatsapp||"";

document.getElementById(

"contactEmail"

).textContent=data.email||"";

document.getElementById(

"contactAddress"

).textContent=data.address||"";

document.getElementById(

"facebookLinkBtn"

).href=data.facebook||"#";

document.getElementById(

"instagramLinkBtn"

).href=data.instagram||"#";

document.getElementById(

"youtubeLinkBtn"

).href=data.youtube||"#";

document.getElementById(

"floatingWhatsappLink"

).href=

`https://wa.me/${data.whatsapp}`;

document.getElementById(

"whatsappButton"

).href=

`https://wa.me/${data.whatsapp}`;

});

}

loadSettings();
// =======================================
// Realtime Sync
// =======================================

onSnapshot(vipNumbersRef,()=>{

loadVipNumbers();

loadCounters();

});

onSnapshot(ordersRef,()=>{

loadCounters();

});

onSnapshot(customersRef,()=>{

loadCounters();

});

onSnapshot(visitorsRef,()=>{

loadCounters();

});

// =======================================
// Prevent Back
// =======================================

history.replaceState(

null,

"",

location.href

);

window.onpopstate=function(){

history.go(1);

};

// =======================================
// Disable Right Click
// =======================================

document.addEventListener(

"contextmenu",

e=>e.preventDefault()

);
// =======================================
// Auto Refresh + Notification
// =======================================

setInterval(()=>{

loadCounters();

},30000);

onSnapshot(

vipNumbersRef,

(snapshot)=>{

showToast(

"VIP Numbers Updated"

);

console.log(

"Total VIP Numbers :",

snapshot.size

);

}

);

window.addEventListener(

"online",

()=>{

showToast(

"Internet Connected"

);

}

);

window.addEventListener(

"offline",

()=>{

showToast(

"No Internet Connection",

"error"

);

}

);

// =======================================
// Hide Loader
// =======================================

window.addEventListener(

"load",

()=>{

loader.style.display="none";

});
// =======================================
// Final Initialization
// =======================================

window.addEventListener("DOMContentLoaded",()=>{

loadSettings();

loadCounters();

loadVipNumbers();

});

// =======================================
// Global Functions
// =======================================

window.showToast=showToast;

window.previewImage=previewImage;

window.selectVip=selectVip;

// =======================================
// Version
// =======================================

const APP_NAME="VIP Number Bazar";

const APP_VERSION="V5 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Website Ready");

// =======================================
// End Of File
// =======================================

export{};
