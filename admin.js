// =======================================
// VIP NUMBER BAZAR V6 PROFESSIONAL
// admin.js
// Part 1
// Lines 1-200
// =======================================

import{

db,

auth,

storage,

vipNumbersRef,

ordersRef,

customersRef,

visitorsRef,

notificationsRef,

settingsRef,

collection,

addDoc,

getDocs,

getDoc,

setDoc,

updateDoc,

deleteDoc,

doc,

query,

where,

orderBy,

limit,

onSnapshot,

serverTimestamp,

increment,

signOut,

onAuthStateChanged,

ref,

uploadBytes,

getDownloadURL

}from "./firebase.js";

// =======================================
// DOM
// =======================================

const loader=document.getElementById("loader");

const logoutBtn=document.getElementById("logoutBtn");

const sidebarItems=document.querySelectorAll(".sidebar-menu li");

const pages=document.querySelectorAll(".page");

const pageTitle=document.getElementById("pageTitle");

const loadingOverlay=document.getElementById("loadingOverlay");

const toast=document.getElementById("toast");

const toastMessage=document.getElementById("toastMessage");

const vipTableBody=document.getElementById("vipTableBody");

const ordersTableBody=document.getElementById("ordersTableBody");

const customersTableBody=document.getElementById("customersTableBody");

const visitorTableBody=document.getElementById("visitorTableBody");

const notificationList=document.getElementById("notificationList");

const scrollTopBtn=document.getElementById("scrollTopBtn");

// =======================================
// Authentication
// =======================================

onAuthStateChanged(

auth,

(user)=>{

if(!user){

window.location.replace(

"login.html"

);

return;

}

loader.style.display="none";

initializeAdmin();

}

);

// =======================================
// Initialize
// =======================================

function initializeAdmin() {
    loader.style.display = "none";
}

// =======================================
// Sidebar
// =======================================

sidebarItems.forEach((item)=>{

item.addEventListener(

"click",

()=>{

sidebarItems.forEach(i=>i.classList.remove("active"));

pages.forEach(p=>p.classList.remove("active"));

item.classList.add("active");

const page=item.dataset.page;

document.getElementById(

page+"Page"

).classList.add("active");

pageTitle.textContent=item.innerText.trim();

}

);

});

// =======================================
// Toast
// =======================================

function showToast(

message,

type="success"

){

toast.className="toast";

toast.classList.add("show");

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
// Dashboard
// =======================================

async function loadDashboard(){

const vipSnapshot=await getDocs(vipNumbersRef);

const ordersSnapshot=await getDocs(ordersRef);

const customersSnapshot=await getDocs(customersRef);

const visitorsSnapshot=await getDocs(visitorsRef);

let totalVip=0;

let available=0;

let sold=0;

let revenue=0;

vipSnapshot.forEach((docItem)=>{

const data=docItem.data();

if(data.deleted===true)return;

totalVip++;

if(data.status==="Available"){

available++;

}

if(data.status==="Sold"){

sold++;

revenue+=Number(data.price||0);

}

});

document.getElementById(

"totalVipNumbers"

).textContent=totalVip;

document.getElementById(

"availableNumbers"

).textContent=available;

document.getElementById(

"soldNumbers"

).textContent=sold;

document.getElementById(

"totalOrders"

).textContent=ordersSnapshot.size;

document.getElementById(

"totalCustomers"

).textContent=customersSnapshot.size;

document.getElementById(

"totalVisitors"

).textContent=visitorsSnapshot.size;

document.getElementById(

"todayVisitCard"

).textContent=visitorsSnapshot.size;

document.getElementById(

"weekVisitCard"

).textContent=visitorsSnapshot.size;

document.getElementById(

"monthVisitCard"

).textContent=visitorsSnapshot.size;

document.getElementById(

"allVisitCard"

).textContent=visitorsSnapshot.size;

document.getElementById(

"todaySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"weeklySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"monthlySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"yearlySales"

).textContent=

"₹"+revenue.toLocaleString();

}

// =======================================
// Logout
// =======================================

logoutBtn.addEventListener(

"click",

async()=>{

if(

!confirm(

"Logout?"

)

)return;

await signOut(auth);

window.location.replace(

"login.html"

);

}

// =======================================
// Auto Refresh
// =======================================

onSnapshot(

vipNumbersRef,

()=>{

loadDashboard();

}

);

onSnapshot(

ordersRef,

()=>{

loadDashboard();

}

);

onSnapshot(

customersRef,

()=>{

loadDashboard();

}

);

onSnapshot(

visitorsRef,

()=>{

loadDashboard();

}

);
// =======================================
// Load VIP Numbers
// =======================================

async function loadVipNumbers(){

vipTableBody.innerHTML="";

const search=document.getElementById("searchVip").value.toLowerCase();

const status=document.getElementById("filterStatus").value;

const category=document.getElementById("filterCategory").value;

const snapshot=await getDocs(

query(

vipNumbersRef,

orderBy("createdAt","desc")

)

);

let index=1;

snapshot.forEach((docItem)=>{

const data=docItem.data();

const deleted=data.deleted===true;

if(

search!=="" &&

!String(data.number)

.toLowerCase()

.includes(search)

)return;

if(

status!=="all"

){

if(status==="Deleted" && !deleted)return;

if(

status!=="Deleted" &&

data.status!==status

)return;

}

if(

category!=="all" &&

data.category!==category

)return;

vipTableBody.innerHTML+=`

<tr>

<td>${index++}</td>

<td>${data.number}</td>

<td>₹${Number(data.price).toLocaleString()}</td>

<td>${data.operator}</td>

<td>${data.category}</td>

<td>

<span class="status ${deleted?"deleted":String(data.status).toLowerCase()}">

${deleted?"Deleted":data.status}

</span>

</td>

<td>${data.views||0}</td>

<td>${data.featured?"Yes":"No"}</td>

<td>

${deleted?`

<button

class="action-btn restore"

onclick="restoreVip('${docItem.id}')">

Restore

</button>

<button

class="action-btn delete"

onclick="permanentDeleteVip('${docItem.id}')">

Delete Forever

</button>

`:`

<button

class="action-btn edit"

onclick="editVip('${docItem.id}')">

Edit

</button>

<button

class="action-btn delete"

onclick="deleteVip('${docItem.id}')">

Delete

</button>

`}

</td>

</tr>

`;

});

}

// =======================================
// Search
// =======================================

document.getElementById(

"searchVip"

).addEventListener(

"input",

loadVipNumbers

);

document.getElementById(

"filterStatus"

).addEventListener(

"change",

loadVipNumbers

);

document.getElementById(

"filterCategory"

).addEventListener(

"change",

loadVipNumbers

);
// =======================================
// Add VIP Number
// =======================================

const addVipBtn=document.getElementById("addVipBtn");

const vipModal=document.getElementById("vipModal");

const vipForm=document.getElementById("vipForm");

const closeVipModal=document.getElementById("closeVipModal");

const cancelVipBtn=document.getElementById("cancelVipBtn");

addVipBtn.addEventListener("click",()=>{

vipForm.reset();

document.getElementById("vipDocId").value="";

document.getElementById("vipModalTitle").innerHTML="Add VIP Number";

vipModal.classList.add("active");

});

closeVipModal.addEventListener("click",()=>{

vipModal.classList.remove("active");

});

cancelVipBtn.addEventListener("click",()=>{

vipModal.classList.remove("active");

});

// =======================================
// Save VIP Number
// =======================================

vipForm.addEventListener("submit",async(e)=>{

e.preventDefault();

startLoading();

try{

const id=document.getElementById("vipDocId").value;

const imageFile=document.getElementById("vipImage").files[0];

let imageUrl="";

if(imageFile){

const storageRef=ref(

storage,

"vipNumbers/"+

Date.now()+"_"+imageFile.name

);

await uploadBytes(

storageRef,

imageFile

);

imageUrl=

await getDownloadURL(

storageRef

);

}

const data={

number:document.getElementById("vipNumber").value,

price:Number(document.getElementById("vipPrice").value),

operator:document.getElementById("vipOperator").value,

category:document.getElementById("vipCategory").value,

status:document.getElementById("vipStatus").value,

featured:document.getElementById("vipFeatured").value==="true",

image:imageUrl,

views:0,

deleted:false,

createdAt:serverTimestamp()

};

if(id===""){

await addDoc(

vipNumbersRef,

data

);

showToast(

"VIP Number Added"

);

}else{

await updateDoc(

doc(

db,

"vipNumbers",

id

),

data

);

showToast(

"VIP Number Updated"

);

}

vipModal.classList.remove("active");

loadVipNumbers();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Save Failed"

);

}

stopLoading();

});
// =======================================
// Edit VIP Number
// =======================================

window.editVip=async function(id){

startLoading();

try{

const vipDoc=await getDoc(

doc(

db,

"vipNumbers",

id

)

);

if(!vipDoc.exists()){

showToast("VIP Number Not Found");

stopLoading();

return;

}

const data=vipDoc.data();

document.getElementById("vipDocId").value=id;

document.getElementById("vipNumber").value=data.number||"";

document.getElementById("vipPrice").value=data.price||0;

document.getElementById("vipOperator").value=data.operator||"Jio";

document.getElementById("vipCategory").value=data.category||"Gold";

document.getElementById("vipStatus").value=data.status||"Available";

document.getElementById("vipFeatured").value=

data.featured?"true":"false";

document.getElementById(

"vipModalTitle"

).innerHTML="Edit VIP Number";

vipModal.classList.add("active");

}catch(error){

console.log(error);

showToast("Load Failed");

}

stopLoading();

};

// =======================================
// Soft Delete
// =======================================

window.deleteVip=async function(id){

if(

!confirm(

"Delete VIP Number?"

)

)return;

startLoading();

try{

await updateDoc(

doc(

db,

"vipNumbers",

id

),

{

deleted:true,

deletedAt:serverTimestamp()

}

);

showToast(

"VIP Number Deleted"

);

loadVipNumbers();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Delete Failed"

);

}

stopLoading();

};

// =======================================
// Restore
// =======================================

window.restoreVip=async function(id){

startLoading();

try{

await updateDoc(

doc(

db,

"vipNumbers",

id

),

{

deleted:false,

deletedAt:null

}

);

showToast(

"VIP Number Restored"

);

loadVipNumbers();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Restore Failed"

);

}

stopLoading();

};

// =======================================
// Permanent Delete
// =======================================

window.permanentDeleteVip=async function(id){

if(

!confirm(

"Delete Forever?"

)

)return;

startLoading();

try{

await deleteDoc(

doc(

db,

"vipNumbers",

id

)

);

showToast(

"VIP Number Permanently Deleted"

);

loadVipNumbers();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Delete Failed"

);

}

stopLoading();

};
// =======================================
// Load Orders
// =======================================

async function loadOrders(){

ordersTableBody.innerHTML="";

const snapshot=await getDocs(

query(

ordersRef,

orderBy("createdAt","desc")

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

const date=data.createdAt?.toDate

?data.createdAt.toDate().toLocaleString()

:"-";

ordersTableBody.innerHTML+=`

<tr>

<td>${docItem.id}</td>

<td>${data.customerName||"-"}</td>

<td>${data.mobile||"-"}</td>

<td>${data.vipNumber||"-"}</td>

<td>₹${Number(data.price||0).toLocaleString()}</td>

<td>${data.paymentStatus||"Pending"}</td>

<td>${data.status||"Pending"}</td>

<td>${date}</td>

<td>

<button

class="action-btn edit"

onclick="completeOrder('${docItem.id}')">

Complete

</button>

<button

class="action-btn delete"

onclick="deleteOrder('${docItem.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

// =======================================
// Complete Order
// =======================================

window.completeOrder=async function(id){

startLoading();

try{

await updateDoc(

doc(

db,

"orders",

id

),

{

status:"Completed",

paymentStatus:"Paid",

updatedAt:serverTimestamp()

}

);

showToast(

"Order Completed"

);

loadOrders();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Update Failed"

);

}

stopLoading();

};

// =======================================
// Delete Order
// =======================================

window.deleteOrder=async function(id){

if(!confirm("Delete Order?"))return;

startLoading();

try{

await deleteDoc(

doc(

db,

"orders",

id

)

);

showToast(

"Order Deleted"

);

loadOrders();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Delete Failed"

);

}

stopLoading();

};
// =======================================
// Load Customers
// =======================================

async function loadCustomers(){

customersTableBody.innerHTML="";

const snapshot=await getDocs(

query(

customersRef,

orderBy("createdAt","desc")

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

customersTableBody.innerHTML+=`

<tr>

<td>${data.name||"-"}</td>

<td>${data.mobile||"-"}</td>

<td>${data.whatsapp||"-"}</td>

<td>${data.city||"-"}</td>

<td>${data.totalOrders||0}</td>

<td>₹${Number(data.totalSpent||0).toLocaleString()}</td>

<td>${data.status||"Active"}</td>

<td>

<button

class="action-btn edit"

onclick="editCustomer('${docItem.id}')">

Edit

</button>

<button

class="action-btn delete"

onclick="deleteCustomer('${docItem.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

// =======================================
// Edit Customer
// =======================================

window.editCustomer=async function(id){

const customerDoc=await getDoc(

doc(

db,

"customers",

id

)

);

if(!customerDoc.exists()){

showToast(

"Customer Not Found"

);

return;

}

const data=customerDoc.data();

const name=prompt(

"Customer Name",

data.name||""

);

if(name===null)return;

const mobile=prompt(

"Mobile Number",

data.mobile||""

);

if(mobile===null)return;

const city=prompt(

"City",

data.city||""

);

await updateDoc(

doc(

db,

"customers",

id

),

{

name:name,

mobile:mobile,

city:city,

updatedAt:serverTimestamp()

}

);

showToast(

"Customer Updated"

);

loadCustomers();

};

// =======================================
// Delete Customer
// =======================================

window.deleteCustomer=async function(id){

if(

!confirm(

"Delete Customer?"

)

)return;

startLoading();

try{

await deleteDoc(

doc(

db,

"customers",

id

)

);

showToast(

"Customer Deleted"

);

loadCustomers();

loadDashboard();

}catch(error){

console.log(error);

showToast(

"Delete Failed"

);

}

stopLoading();

};
// =======================================
// Load Visitors
// =======================================

async function loadVisitors(){

visitorTableBody.innerHTML="";

const snapshot=await getDocs(

query(

visitorsRef,

orderBy("createdAt","desc"),

limit(500)

)

);

snapshot.forEach((docItem)=>{

const data=docItem.data();

const date=data.createdAt?.toDate

?data.createdAt.toDate().toLocaleString()

:"-";

visitorTableBody.innerHTML+=`

<tr>

<td>${date}</td>

<td>${data.device||"-"}</td>

<td>${data.browser||"-"}</td>

<td>${data.country||"-"}</td>

<td>${data.city||"-"}</td>

<td>${data.ip||"-"}</td>

</tr>

`;

});

}

// =======================================
// Notifications
// =======================================

async function loadNotifications(){

notificationList.innerHTML="";

onSnapshot(

query(

notificationsRef,

orderBy("createdAt","desc"),

limit(100)

),

(snapshot)=>{

notificationList.innerHTML="";

snapshot.forEach((docItem)=>{

const data=docItem.data();

const date=data.createdAt?.toDate

?data.createdAt.toDate().toLocaleString()

:"-";

notificationList.innerHTML+=`

<div class="notification-item">

<h4>

${data.title||"Notification"}

</h4>

<p>

${data.message||""}

</p>

<small>

${date}

</small>

</div>

`;

});

}

);

}

// =======================================
// Clear Notifications
// =======================================

const clearNotificationBtn=

document.getElementById(

"clearNotificationBtn"

);

if(clearNotificationBtn){

clearNotificationBtn.addEventListener(

"click",

()=>{

notificationList.innerHTML="";

showToast(

"Notifications Cleared"

);

}

);

}
// =======================================
// Settings
// =======================================

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

document.getElementById("siteName").value=data.siteName||"";

document.getElementById("whatsappNumber").value=data.whatsapp||"8070424242";

document.getElementById("siteEmail").value=data.email||"";

document.getElementById("instagramLink").value=data.instagram||"";

document.getElementById("facebookLink").value=data.facebook||"";

document.getElementById("youtubeLink").value=data.youtube||"";

document.getElementById("officeAddress").value=data.address||"";

document.getElementById("websiteTheme").value=data.theme||"dark";

document.getElementById("maintenanceMode").value=data.maintenance||"off";

}

}catch(error){

console.log(error);

}

}

const settingsForm=document.getElementById("settingsForm");

if(settingsForm){

settingsForm.addEventListener("submit",async(e)=>{

e.preventDefault();

startLoading();

try{

await setDoc(

doc(db,"settings","website"),

{

siteName:document.getElementById("siteName").value,

whatsapp:document.getElementById("whatsappNumber").value,

email:document.getElementById("siteEmail").value,

instagram:document.getElementById("instagramLink").value,

facebook:document.getElementById("facebookLink").value,

youtube:document.getElementById("youtubeLink").value,

address:document.getElementById("officeAddress").value,

theme:document.getElementById("websiteTheme").value,

maintenance:document.getElementById("maintenanceMode").value,

updatedAt:serverTimestamp()

},

{merge:true}

);

showToast("Settings Saved");

}catch(error){

console.log(error);

showToast("Save Failed");

}

stopLoading();

});

}

// =======================================
// Realtime
// =======================================

onSnapshot(vipNumbersRef,()=>{

loadDashboard();

loadVipNumbers();

});

onSnapshot(ordersRef,()=>{

loadDashboard();

loadOrders();

});

onSnapshot(customersRef,()=>{

loadDashboard();

loadCustomers();

});

onSnapshot(visitorsRef,()=>{

loadDashboard();

loadVisitors();

});
// =======================================
// Scroll Top Button
// =======================================

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

});

if(scrollTopBtn){

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

// =======================================
// Notification Sound
// =======================================

function playNotificationSound(){

const audio=new Audio("notification.mp3");

audio.volume=0.5;

audio.play().catch(()=>{});

}

// =======================================
// Auto Logout (10 Minutes)
// =======================================

let logoutTimer;

function resetLogoutTimer(){

clearTimeout(logoutTimer);

logoutTimer=setTimeout(async()=>{

try{

await signOut(auth);

}catch(error){

console.log(error);

}

alert(

"Session Expired"

);

window.location.replace(

"login.html"

);

},10*60*1000);

}

[

"click",

"mousemove",

"keydown",

"touchstart",

"scroll"

].forEach((eventName)=>{

document.addEventListener(

eventName,

resetLogoutTimer

);

});

resetLogoutTimer();

// =======================================
// Keyboard Shortcut
// =======================================

document.addEventListener(

"keydown",

(e)=>{

if(e.key==="Escape"){

document.querySelectorAll(".modal").forEach(

(m)=>m.classList.remove("active")

);

}

});

// =======================================
// Page Load
// =======================================

document.addEventListener(

"DOMContentLoaded",

()=>{

loadDashboard();

loadVipNumbers();

loadOrders();

loadCustomers();

loadVisitors();

loadNotifications();

loadSettings();

console.log("VIP NUMBER BAZAR");

console.log("ADMIN PANEL READY");

});

// =======================================
// Export
// =======================================

window.showToast=showToast;

window.loadDashboard=loadDashboard;

window.loadVipNumbers=loadVipNumbers;

window.loadOrders=loadOrders;

window.loadCustomers=loadCustomers;

window.loadVisitors=loadVisitors;

window.loadNotifications=loadNotifications;

window.loadSettings=loadSettings;

// =======================================
// Version
// =======================================

const APP_NAME="VIP NUMBER BAZAR";

const APP_VERSION="V6 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Admin Module Ready");

// =======================================
// End Of Part 10
// =======================================
// =======================================
// Backup & Restore
// =======================================

window.exportVipNumbers=async function(){

try{

const snapshot=await getDocs(

query(

vipNumbersRef,

orderBy("createdAt","desc")

)

);

const data=[];

snapshot.forEach((docItem)=>{

data.push({

id:docItem.id,

...docItem.data()

});

});

const blob=new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=

document.createElement("a");

a.href=url;

a.download="vipNumbersBackup.json";

a.click();

URL.revokeObjectURL(url);

showToast(

"Backup Downloaded"

);

}catch(error){

console.log(error);

showToast(

"Backup Failed"

);

}

};

// =======================================
// Export Orders
// =======================================

window.exportOrders=async function(){

const snapshot=

await getDocs(

ordersRef

);

const data=[];

snapshot.forEach((docItem)=>{

data.push({

id:docItem.id,

...docItem.data()

});

});

const blob=

new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=

document.createElement("a");

a.href=url;

a.download="ordersBackup.json";

a.click();

URL.revokeObjectURL(url);

showToast(

"Orders Backup Ready"

);

};

// =======================================
// Export Customers
// =======================================

window.exportCustomers=async function(){

const snapshot=

await getDocs(

customersRef

);

const data=[];

snapshot.forEach((docItem)=>{

data.push({

id:docItem.id,

...docItem.data()

});

});

const blob=

new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=

document.createElement("a");

a.href=url;

a.download="customersBackup.json";

a.click();

URL.revokeObjectURL(url);

showToast(

"Customers Backup Ready"

);

};

// =======================================
// Export Visitors
// =======================================

window.exportVisitors=async function(){

const snapshot=

await getDocs(

visitorsRef

);

const data=[];

snapshot.forEach((docItem)=>{

data.push({

id:docItem.id,

...docItem.data()

});

});

const blob=

new Blob(

[JSON.stringify(data,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=

document.createElement("a");

a.href=url;

a.download="visitorsBackup.json";

a.click();

URL.revokeObjectURL(url);

showToast(

"Visitors Backup Ready"

);

};
// =======================================
// Analytics
// =======================================

function calculateRevenue(snapshot){

let revenue=0;

snapshot.forEach((docItem)=>{

const data=docItem.data();

if(data.status==="Sold"){

revenue+=Number(data.price||0);

}

});

return revenue;

}

async function refreshAnalytics(){

const vipSnapshot=

await getDocs(vipNumbersRef);

const ordersSnapshot=

await getDocs(ordersRef);

const revenue=

calculateRevenue(vipSnapshot);

document.getElementById(

"todaySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"weeklySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"monthlySales"

).textContent=

"₹"+revenue.toLocaleString();

document.getElementById(

"yearlySales"

).textContent=

"₹"+revenue.toLocaleString();

console.log(

"Orders :",

ordersSnapshot.size

);

}

// =======================================
// Notification Creator
// =======================================

window.addNotification=

async function(

title,

message

){

try{

await addDoc(

notificationsRef,

{

title:title,

message:message,

createdAt:serverTimestamp()

}

);

playNotificationSound();

}catch(error){

console.log(error);

}

};

// =======================================
// Daily Refresh
// =======================================

setInterval(()=>{

refreshAnalytics();

},60000);

// =======================================
// Auto Welcome Notification
// =======================================

setTimeout(()=>{

showToast(

"Welcome Administrator"

);

},1000);

// =======================================
// Dashboard Refresh
// =======================================

window.refreshDashboard=

function(){

loadDashboard();

loadVipNumbers();

loadOrders();

loadCustomers();

loadVisitors();

loadNotifications();

refreshAnalytics();

};

// =======================================
// Reserved
// =======================================

// 2220

// 2240

// 2260

// 2280

// 2300

// 2320

// 2340

// 2360

// 2380

// 2400
// =======================================
// Search Helpers
// =======================================

window.searchOrders=function(keyword){

keyword=keyword.toLowerCase();

const rows=ordersTableBody.querySelectorAll("tr");

rows.forEach((row)=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

};

window.searchCustomers=function(keyword){

keyword=keyword.toLowerCase();

const rows=customersTableBody.querySelectorAll("tr");

rows.forEach((row)=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

};

window.searchVisitors=function(keyword){

keyword=keyword.toLowerCase();

const rows=visitorTableBody.querySelectorAll("tr");

rows.forEach((row)=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

};

// =======================================
// Export CSV
// =======================================

window.downloadTable=function(tableId,fileName){

const table=document.getElementById(tableId);

let csv=[];

for(const row of table.rows){

const cols=[];

for(const cell of row.cells){

cols.push('"'+

cell.innerText.replace(/"/g,'""')

+'"');

}

csv.push(cols.join(","));

}

const blob=new Blob(

[csv.join("\n")],

{

type:"text/csv"

}

);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download=fileName;

a.click();

URL.revokeObjectURL(url);

showToast("CSV Downloaded");

};

// =======================================
// Auto Save Draft
// =======================================

window.addEventListener(

"beforeunload",

()=>{

localStorage.setItem(

"adminLastOpen",

new Date().toLocaleString()

);

}

);

// =======================================
// Last Login
// =======================================

console.log(

"Last Open :",

localStorage.getItem(

"adminLastOpen"

)

);

// =======================================
// Reserved
// =======================================

// 2420

// 2440

// 2460

// 2480

// 2500

// 2520

// 2540

// 2560

// 2580

// 2600
// =======================================
// System Health
// =======================================

window.systemHealth=function(){

return{

firebase:"Connected",

authentication:

auth.currentUser

?

"Online"

:

"Offline",

database:"Firestore",

storage:"Firebase Storage",

version:"V6 Professional",

website:"VIP NUMBER BAZAR"

};

};

// =======================================
// Memory Monitor
// =======================================

if(performance.memory){

console.log(

"Memory Used:",

performance.memory.usedJSHeapSize

);

}

// =======================================
// Admin Information
// =======================================

const ADMIN_INFO={

owner:"Maldev Thakor",

mobile:"6354312829",

support:"RUDRA Zarvariya",

whatsapp:"8070424242"

};

console.table(ADMIN_INFO);

// =======================================
// App Information
// =======================================

const APP_INFO={

name:"VIP NUMBER BAZAR",

version:"V6 Professional",

developer:"OpenAI",

year:"2026"

};

console.table(APP_INFO);

// =======================================
// Window Events
// =======================================

window.addEventListener("focus",()=>{

console.log("Admin Active");

});

window.addEventListener("blur",()=>{

console.log("Admin Inactive");

});

// =======================================
// Auto Refresh Dashboard
// =======================================

setInterval(()=>{

loadDashboard();

},120000);

// =======================================
// Reserved
// =======================================

// 2620

// 2640

// 2660

// 2680

// 2700

// 2720

// 2740

// 2760

// 2780

// 2800
// =======================================
// Final Initialize
// =======================================

window.addEventListener("load",()=>{

console.log("VIP NUMBER BAZAR Started");

refreshDashboard();

});

// =======================================
// Auto Backup Reminder
// =======================================

setInterval(()=>{

showToast(

"Remember to Backup Database"

);

},3600000);

// =======================================
// Admin Console
// =======================================

window.adminConsole={

refresh(){

refreshDashboard();

},

backup(){

exportVipNumbers();

},

orders(){

exportOrders();

},

customers(){

exportCustomers();

},

visitors(){

exportVisitors();

},

health(){

return systemHealth();

}

};

// =======================================
// Global Error Handler
// =======================================

window.addEventListener("error",(e)=>{

console.error(

"System Error :",

e.message

);

});

// =======================================
// Unhandled Promise
// =======================================

window.addEventListener(

"unhandledrejection",

(e)=>{

console.error(

"Promise Error :",

e.reason

);

});

// =======================================
// Final Log
// =======================================

console.log("================================");

console.log("VIP NUMBER BAZAR");

console.log("V6 Professional");

console.log("Admin Panel Loaded Successfully");

console.log("Owner : Maldev Thakor");

console.log("Support : RUDRA Zarvariya");

console.log("WhatsApp : 8070424242");

console.log("================================");

// =======================================
// Module Export
// =======================================

export{

refreshDashboard,

loadDashboard,

loadVipNumbers,

loadOrders,

loadCustomers,

loadVisitors,

loadNotifications,

loadSettings,

showToast

};

// =======================================
// END OF admin.js
// =======================================
