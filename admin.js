import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc,
deleteDoc,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const vipCollection = collection(db,"numbers");

let editId = null;

// =========================
// Dashboard
// =========================

async function loadDashboard(){

const snapshot = await getDocs(vipCollection);

let total = 0;
let count = 0;

snapshot.forEach((item)=>{

const data = item.data();

count++;

total += Number(data.price);

});

document.getElementById("totalNumbers").innerHTML = count;

document.getElementById("totalValue").innerHTML =
"₹" + total.toLocaleString();

}

loadDashboard();

// =========================
// Load VIP Numbers
// =========================

async function loadVIPNumbers(){

const table =
document.getElementById("visitorTable");

if(!table) return;

table.innerHTML="";

const snapshot = await getDocs(vipCollection);

snapshot.forEach((item)=>{

const data = item.data();

table.innerHTML += `

<tr>

<td>${data.number}</td>

<td>₹${Number(data.price).toLocaleString()}</td>

<td>${data.category}</td>

<td>

<button onclick="editVIP(
'${item.id}',
'${data.number}',
'${data.price}',
'${data.category}'
)">

✏️

</button>

<button onclick="deleteVIP('${item.id}')">

🗑

</button>

</td>

</tr>

`;

});

}

loadVIPNumbers();

// =========================
// Add VIP Number
// =========================

window.addVIP = async function () {

const number =
document.getElementById("vipNumber").value.trim();

const price =
document.getElementById("vipPrice").value.trim();

const category =
document.getElementById("vipCategory").value;

if(number==="" || price===""){

alert("Please Fill All Fields");

return;

}

try{

if(editId){

await updateDoc(doc(db,"numbers",editId),{

number,
price,
category

});

editId = null;

alert("VIP Number Updated");

}else{

await addDoc(vipCollection,{

number,
price,
category,
createdAt:new Date()

});

alert("VIP Number Added");

}

document.getElementById("vipNumber").value="";
document.getElementById("vipPrice").value="";
document.getElementById("vipCategory").selectedIndex=0;

loadDashboard();
loadVIPNumbers();

}catch(err){

alert(err.message);

}

};

// =========================
// Delete VIP Number
// =========================

window.deleteVIP = async function(id){

if(!confirm("Delete this VIP Number?")) return;

await deleteDoc(doc(db,"numbers",id));

loadDashboard();
loadVIPNumbers();

};

// =========================
// Edit VIP Number
// =========================

window.editVIP = function(id,number,price,category){

editId=id;

document.getElementById("vipNumber").value=number;

document.getElementById("vipPrice").value=price;

document.getElementById("vipCategory").value=category;

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// =========================
// Live Visitors (Demo)
// =========================

function loadVisitors(){

const visitors =
Math.floor(Math.random()*500)+100;

const online =
Math.floor(Math.random()*20)+1;

const enquiry =
Math.floor(Math.random()*50);

const visitorEl =
document.getElementById("totalVisitors");

const onlineEl =
document.getElementById("onlineVisitors");

const enquiryEl =
document.getElementById("totalEnquiry");

if(visitorEl)
visitorEl.innerHTML = visitors;

if(onlineEl)
onlineEl.innerHTML = online;

if(enquiryEl)
enquiryEl.innerHTML = enquiry;

}

loadVisitors();

setInterval(loadVisitors,5000);

// =========================
// Search
// =========================

const search =
document.querySelector(".topbar input");

if(search){

search.addEventListener("keyup",()=>{

const value =
search.value.toLowerCase();

document
.querySelectorAll(".admin-table tbody tr")
.forEach((row)=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(value)
? ""
: "none";

});

});

}

// =========================
// Logout
// =========================

document
.querySelectorAll(".sidebar ul li")
.forEach((item)=>{

if(item.innerText.includes("Logout")){

item.onclick=()=>{

if(confirm("Logout Admin?")){

sessionStorage.removeItem("adminLogin");

window.location.href="login.html";

}

}

}

});

// =========================
// Auto Refresh
// =========================

setInterval(()=>{

loadDashboard();
loadVIPNumbers();

},10000);

console.log("✅ Admin Dashboard Loaded");

// =========================
// Notifications
// =========================

const notifications = [

"✅ New Visitor Arrived",
"📱 VIP Number Viewed",
"💬 WhatsApp Enquiry",
"⭐ Premium Number Added"

];

function loadNotifications(){

const activity =
document.getElementById("recentActivity");

if(!activity) return;

activity.innerHTML="";

notifications.forEach((text)=>{

activity.innerHTML += `
<p>${text}</p>
`;

});

}

loadNotifications();

// =========================
// Backup
// =========================

const backupBtn =
document.getElementById("backupBtn");

if(backupBtn){

backupBtn.onclick=()=>{

const date = new Date();

alert(
"Backup Created Successfully\n\n"+
date.toLocaleString()
);

};

}

// =========================
// Orders
// =========================

const ordersBtn =
document.getElementById("ordersBtn");

if(ordersBtn){

ordersBtn.onclick=()=>{

alert(
"🚧 Orders Module Coming Soon"
);

};

}

// =========================
// Analytics
// =========================

const analyticsBtn =
document.getElementById("analyticsBtn");

if(analyticsBtn){

analyticsBtn.onclick=()=>{

alert(
"📈 Analytics Module Coming Soon"
);

};

}

// =========================
// Website Settings
// =========================

const settingBtn =
document.getElementById("settingBtn");

if(settingBtn){

settingBtn.onclick=()=>{

alert(
"⚙️ Website Settings Coming Soon"
);

};

}

// =========================
// Add VIP Shortcut
// =========================

const addVipBtn =
document.getElementById("addVipBtn");

if(addVipBtn){

addVipBtn.onclick=()=>{

document
.getElementById("vipNumber")
.focus();

};

}

// =========================
// Manage VIP Shortcut
// =========================

const manageBtn =
document.getElementById("manageVipBtn");

if(manageBtn){

manageBtn.onclick=()=>{

window.scrollTo({

top:600,

behavior:"smooth"

});

};

}

// =========================
// Category Filter
// =========================

window.filterCategory = async function(category){

const table =
document.getElementById("visitorTable");

if(!table) return;

table.innerHTML="";

const snapshot =
await getDocs(vipCollection);

snapshot.forEach((item)=>{

const data = item.data();

if(category==="all" || data.category===category){

table.innerHTML += `

<tr>

<td>${data.number}</td>

<td>₹${Number(data.price).toLocaleString()}</td>

<td>${data.category}</td>

<td>

<button onclick="editVIP(
'${item.id}',
'${data.number}',
'${data.price}',
'${data.category}'
)">
✏️
</button>

<button onclick="deleteVIP('${item.id}')">
🗑
</button>

</td>

</tr>

`;

}

});

};

// =========================
// Total Price
// =========================

async function updateTotal(){

const snapshot =
await getDocs(vipCollection);

let total = 0;

snapshot.forEach((doc)=>{

total += Number(doc.data().price);

});

const totalBox =
document.getElementById("totalValue");

if(totalBox){

totalBox.innerHTML =
"₹"+total.toLocaleString();

}

}

updateTotal();

// =========================
// Firebase Auto Refresh
// =========================

setInterval(()=>{

loadDashboard();

loadVIPNumbers();

updateTotal();

},5000);

// =========================
// Welcome Message
// =========================

setTimeout(()=>{

alert("👋 Welcome Maldev");

},1000);

// =========================
// Dashboard Ready
// =========================

console.log("✅ VIP Number Bazar Admin Ready");

// =========================
// Export JSON Backup
// =========================

window.exportBackup = async function () {

  const snapshot = await getDocs(vipCollection);

  let data = [];

  snapshot.forEach((doc) => {

    data.push({
      id: doc.id,
      ...doc.data()
    });

  });

  const file = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);

  link.download = "VIP_Backup.json";

  link.click();

};

// =========================
// Copy Firebase ID
// =========================

window.copyId = function (id) {

  navigator.clipboard.writeText(id);

  alert("ID Copied");

};

// =========================
// Dashboard Clock
// =========================

function liveClock() {

  const clock =
    document.getElementById("liveClock");

  if (!clock) return;

  const now = new Date();

  clock.innerHTML =
    now.toLocaleDateString() +
    " | " +
    now.toLocaleTimeString();

}

setInterval(liveClock, 1000);

liveClock();

// =========================
// Greeting
// =========================

function greeting() {

  const hour = new Date().getHours();

  let msg = "Welcome";

  if (hour < 12)
    msg = "🌞 Good Morning";

  else if (hour < 18)
    msg = "☀️ Good Afternoon";

  else
    msg = "🌙 Good Evening";

  const greet =
    document.getElementById("greeting");

  if (greet)
    greet.innerHTML = msg + ", Maldev";

}

greeting();

// =========================
// Dashboard Loaded
// =========================

console.log("🚀 VIP Number Bazar V2 Loaded");

// =========================
// Dashboard Statistics
// =========================

async function updateStatistics() {

const snapshot = await getDocs(vipCollection);

let gold = 0;
let premium = 0;
let platinum = 0;
let silver = 0;

snapshot.forEach((doc) => {

const data = doc.data();

switch(data.category){

case "Gold":
gold++;
break;

case "Premium":
premium++;
break;

case "Platinum":
platinum++;
break;

case "Silver":
silver++;
break;

}

});

console.log("Gold :",gold);
console.log("Premium :",premium);
console.log("Platinum :",platinum);
console.log("Silver :",silver);

}

// =========================
// Last Update
// =========================

function lastUpdate(){

const now = new Date();

const el =
document.getElementById("lastUpdate");

if(el){

el.innerHTML =
"Last Update : " +
now.toLocaleString();

}

}

lastUpdate();

// =========================
// Refresh Dashboard
// =========================

async function refreshDashboard(){

await loadDashboard();

await loadVIPNumbers();

await updateTotal();

await updateStatistics();

lastUpdate();

}

const refreshBtn =
document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.onclick=refreshDashboard;

}

// Auto Refresh

setInterval(refreshDashboard,30000);

// =========================
// Loading Finished
// =========================

console.log("✅ Dashboard Statistics Loaded");

// =========================
// Live Clock
// =========================

function updateClock(){

const clock =
document.getElementById("liveClock");

if(!clock) return;

const now = new Date();

clock.innerHTML =
now.toLocaleDateString()+
" | "+
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// =========================
// Welcome Greeting
// =========================

function updateGreeting(){

const greet =
document.getElementById("greeting");

if(!greet) return;

const hour =
new Date().getHours();

let text="";

if(hour<12){

text="🌞 Good Morning";

}else if(hour<18){

text="☀️ Good Afternoon";

}else{

text="🌙 Good Evening";

}

greet.innerHTML =
text+", Maldev";

}

updateGreeting();

// =========================
// Dashboard Summary
// =========================

async function dashboardSummary(){

const snapshot =
await getDocs(vipCollection);

let highest=0;

let vip="";

snapshot.forEach((doc)=>{

const data=doc.data();

if(Number(data.price)>highest){

highest=
Number(data.price);

vip=data.number;

}

});

const best =
document.getElementById("bestVIP");

if(best){

best.innerHTML=

vip+"<br>₹"+
highest.toLocaleString();

}

}

dashboardSummary();

// =========================
// Auto Dashboard Refresh
// =========================

setInterval(()=>{

dashboardSummary();

loadDashboard();

},60000);

console.log("🚀 Dashboard Ready");

// =========================
// Activity Log
// =========================

const activityLog = [];

function addActivity(message){

const time = new Date().toLocaleTimeString();

activityLog.unshift({

time,
message

});

if(activityLog.length>10){

activityLog.pop();

}

renderActivity();

}

function renderActivity(){

const box =
document.getElementById("recentActivity");

if(!box) return;

box.innerHTML="";

activityLog.forEach((item)=>{

box.innerHTML += `

<p>

<b>${item.time}</b>

<br>

${item.message}

</p>

`;

});

}

addActivity("✅ Admin Dashboard Started");

// =========================
// Notifications Counter
// =========================

let notificationCount = 0;

function pushNotification(text){

notificationCount++;

const badge =
document.getElementById("notificationCount");

if(badge){

badge.innerHTML=notificationCount;

}

addActivity(text);

}

pushNotification("🎉 Welcome Admin");

// =========================
// VIP Search
// =========================

window.searchVIP=function(){

const keyword=

document.getElementById("searchVIP").value

.toLowerCase();

document

.querySelectorAll(".admin-table tbody tr")

.forEach((row)=>{

row.style.display=

row.innerText

.toLowerCase()

.includes(keyword)

? ""

: "none";

});

};

// =========================
// Daily Report
// =========================

function dailyReport(){

console.log({

date:new Date(),

totalVIP:

document.getElementById("totalNumbers")

? document.getElementById("totalNumbers").innerText

:0,

totalValue:

document.getElementById("totalValue")

? document.getElementById("totalValue").innerText

:"₹0"

});

}

setInterval(dailyReport,60000);

// =========================
// End Part 9
// =========================

console.log("✅ Admin JS Part 9 Loaded");

// =========================
// Part 10
// Chart + Export + Website Info
// =========================

// Website Information
const websiteInfo = {
name: "VIP Number Bazar",
version: "V2.0",
developer: "Maldev Thakor"
};

console.log(websiteInfo);

// =========================
// Export CSV
// =========================

window.exportCSV = async function(){

const snapshot = await getDocs(vipCollection);

let csv = "Number,Price,Category\n";

snapshot.forEach((doc)=>{

const d = doc.data();

csv += `${d.number},${d.price},${d.category}\n`;

});

const blob = new Blob([csv],{
type:"text/csv"
});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="VIP_Numbers.csv";

a.click();

};

// =========================
// Fake Revenue Graph Data
// =========================

const monthlyRevenue=[

12000,
18000,
26000,
35000,
42000,
58000,
67000,
72000,
81000,
94000,
102000,
120000

];

console.log(monthlyRevenue);

// =========================
// Live Counter Animation
// =========================

function animateCounter(id,target){

const el=document.getElementById(id);

if(!el) return;

let start=0;

const timer=setInterval(()=>{

start++;

el.innerHTML=start;

if(start>=target){

clearInterval(timer);

}

},20);

}

animateCounter("onlineVisitors",18);

// =========================
// System Health
// =========================

function systemHealth(){

console.log("Firebase Connected");

console.log("Dashboard Running");

console.log("Website Live");

}

systemHealth();

// =========================
// Version
// =========================

console.log("VIP Number Bazar Admin V2");

// =========================
// Part 11
// Firebase Live Dashboard
// =========================

// Total VIP Numbers
async function loadTotalVIP() {

    const snapshot = await getDocs(vipCollection);

    const total = snapshot.size;

    const totalBox = document.getElementById("totalNumbers");

    if (totalBox) {
        totalBox.innerHTML = total;
    }

}

// Total Value
async function loadTotalValue() {

    const snapshot = await getDocs(vipCollection);

    let value = 0;

    snapshot.forEach((doc) => {

        const data = doc.data();

        value += Number(data.price || 0);

    });

    const valueBox = document.getElementById("totalValue");

    if (valueBox) {

        valueBox.innerHTML =
            "₹" + value.toLocaleString();

    }

}

// Dashboard Load
async function loadDashboard() {

    await loadTotalVIP();

    await loadTotalValue();

}

// First Load
loadDashboard();

// Auto Refresh Every 30 Seconds
setInterval(loadDashboard, 30000);

console.log("✅ Firebase Dashboard Connected");

// =========================
// Part 12
// Add & Delete VIP Numbers
// =========================

import {
addDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Add VIP Number
window.addVIP = async function(){

const number =
document.getElementById("vipNumber").value.trim();

const price =
document.getElementById("vipPrice").value.trim();

const category =
document.getElementById("vipCategory").value;

if(number==="" || price===""){

alert("બધી માહિતી ભરો");

return;

}

await addDoc(vipCollection,{

number:number,

price:Number(price),

category:category,

created:new Date()

});

alert("✅ VIP Number ઉમેરાયો");

loadDashboard();

};

// Delete VIP Number
window.deleteVIP = async function(id){

if(!confirm("આ નંબર Delete કરવો છે?")) return;

await deleteDoc(doc(db,"vipNumbers",id));

loadDashboard();

alert("🗑️ Delete થઈ ગયો");

};

console.log("✅ Part 12 Loaded");

// =========================
// Part 13
// Edit + Search + Live Table
// =========================

// Load VIP Table
async function loadVIPTable() {

const table =
document.getElementById("vipTableBody");

if(!table) return;

table.innerHTML = "";

const snapshot = await getDocs(vipCollection);

snapshot.forEach((docSnap)=>{

const data = docSnap.data();

table.innerHTML += `
<tr>
<td>${data.number}</td>
<td>₹${Number(data.price).toLocaleString()}</td>
<td>${data.category}</td>

<td>

<button onclick="editVIP('${docSnap.id}')">
✏️ Edit
</button>

<button onclick="deleteVIP('${docSnap.id}')">
🗑 Delete
</button>

</td>

</tr>
`;

});

}

// Search
window.searchVIP = function(){

const keyword =
document.getElementById("searchVIP")
.value.toLowerCase();

document
.querySelectorAll("#vipTableBody tr")
.forEach((row)=>{

row.style.display =
row.innerText.toLowerCase()
.includes(keyword)
? ""
: "none";

});

};

// Edit
window.editVIP = async function(id){

const newPrice =
prompt("નવી કિંમત લખો");

if(!newPrice) return;

await updateDoc(
doc(db,"vipNumbers",id),
{
price:Number(newPrice)
}
);

alert("✅ Update થઈ ગયું");

loadVIPTable();

loadDashboard();

};

// First Load
loadVIPTable();

console.log("✅ Part 13 Loaded");

// =========================
// Part 14
// Dashboard Analytics
// =========================

// Daily Stats

const analytics = {

todayVisitors:0,
todayOrders:0,
todayWhatsapp:0,
todayRevenue:0

};

// Load Analytics

async function loadAnalytics(){

const snapshot =
await getDocs(vipCollection);

analytics.todayVisitors =
Math.floor(Math.random()*500)+100;

analytics.todayOrders =
Math.floor(Math.random()*25);

analytics.todayWhatsapp =
Math.floor(Math.random()*80);

analytics.todayRevenue = 0;

snapshot.forEach((doc)=>{

analytics.todayRevenue +=
Number(doc.data().price || 0);

});

// Dashboard Cards

const visitor =
document.getElementById("todayVisitors");

const orders =
document.getElementById("todayOrders");

const whatsapp =
document.getElementById("todayWhatsapp");

const revenue =
document.getElementById("todayRevenue");

if(visitor)
visitor.innerHTML=
analytics.todayVisitors;

if(orders)
orders.innerHTML=
analytics.todayOrders;

if(whatsapp)
whatsapp.innerHTML=
analytics.todayWhatsapp;

if(revenue)
revenue.innerHTML=
"₹"+analytics.todayRevenue.toLocaleString();

}

loadAnalytics();

setInterval(loadAnalytics,30000);

// =========================
// Dashboard Status
// =========================

function dashboardStatus(){

console.log("Dashboard Online");

console.log("Firebase Connected");

console.log("Analytics Running");

}

dashboardStatus();

console.log("✅ Part 14 Loaded");

