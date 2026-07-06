// ======================================
// VIP NUMBER BAZAR V7 BUILD
// admin.js Part 1
// ======================================

import {
db,
auth
} from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loader=document.getElementById("loader");

const pageTitle=document.getElementById("pageTitle");

const pages=document.querySelectorAll(".page");

const menuItems=document.querySelectorAll(".sidebar li");

const totalVip=document.getElementById("totalVipNumbers");

const availableVip=document.getElementById("availableNumbers");

const soldVip=document.getElementById("soldNumbers");

const totalOrders=document.getElementById("totalOrders");

const vipTableBody=document.getElementById("vipTableBody");

let vipList=[];

function hideLoader(){

if(loader){

loader.style.display="none";

}

}

function showLoader(){

if(loader){

loader.style.display="flex";

}

}

function openPage(page){

pages.forEach(p=>p.classList.remove("active"));

document.getElementById(page+"Page").classList.add("active");

menuItems.forEach(m=>m.classList.remove("active"));

document
.querySelector(`[data-page="${page}"]`)
.classList.add("active");

pageTitle.innerText=
page.charAt(0).toUpperCase()+page.slice(1);

}

menuItems.forEach(item=>{

item.onclick=()=>{

openPage(item.dataset.page);

};

});

showLoader();
// ======================================
// VIP NUMBER BAZAR V7 BUILD
// admin.js Part 2
// ======================================

async function loadVipNumbers(){

try{

const snap=await getDocs(collection(db,"vipNumbers"));

vipList=[];

vipTableBody.innerHTML="";

let available=0;
let sold=0;

snap.forEach(doc=>{

const data=doc.data();

vipList.push({
id:doc.id,
...data
});

if(data.status==="Available"){
available++;
}else{
sold++;
}

vipTableBody.innerHTML+=`

<tr>

<td>${vipList.length}</td>

<td>${data.number || "-"}</td>

<td>₹${data.price || 0}</td>

<td>

<span class="${
data.status==="Available"
?
"available"
:
"sold"
}">

${data.status}

</span>

</td>

<td>

<button class="primary-btn">

Edit

</button>

</td>

</tr>

`;

});

totalVip.textContent=vipList.length;

availableVip.textContent=available;

soldVip.textContent=sold;

totalOrders.textContent=0;

hideLoader();

}catch(error){

console.error(error);

hideLoader();

alert("Firebase Error : "+error.message);

}

}

loadVipNumbers();
// ======================================
// VIP NUMBER BAZAR V7 BUILD
// admin.js Part 3
// ======================================

// Logout Button
const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick=async()=>{

try{

await auth.signOut();

window.location.href="login.html";

}catch(e){

alert(e.message);

}

};

}

// Hide Loader after page load
window.addEventListener("load",()=>{

setTimeout(()=>{

hideLoader();

},500);

});

// Export
window.loadVipNumbers=loadVipNumbers;

console.log("VIP NUMBER BAZAR");
console.log("V7 BUILD");
console.log("Admin Loaded");
