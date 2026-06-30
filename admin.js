import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const vipCollection = collection(db,"numbers");

let editId = null;

// =========================
// Dashboard
// =========================

async function loadDashboard(){

const snapshot = await getDocs(vipCollection);

let totalVIP = 0;
let totalValue = 0;

snapshot.forEach((item)=>{

const data = item.data();

totalVIP++;

totalValue += Number(data.price || 0);

});

const vip=document.getElementById("totalNumbers");
const value=document.getElementById("totalValue");

if(vip) vip.innerHTML=totalVIP;
if(value) value.innerHTML="₹"+totalValue.toLocaleString();

}

loadDashboard();

// =========================
// Load VIP Table
// =========================

async function loadVIPTable(){

const tbody =
document.getElementById("vipTableBody");

if(!tbody) return;

tbody.innerHTML="";

const snapshot =
await getDocs(vipCollection);

snapshot.forEach((item)=>{

const data=item.data();

tbody.innerHTML += `

<tr>

<td>${data.number}</td>

<td>₹${Number(data.price).toLocaleString()}</td>

<td>${data.category}</td>

<td>

<button onclick="editVIP('${item.id}')">
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

loadVIPTable();

console.log("✅ Admin Final Part 1 Loaded");

// =========================
// Final Part 2
// Add / Edit / Delete / Search
// =========================

// Add VIP
window.addVIP = async function(){

const number =
document.getElementById("vipNumber").value.trim();

const price =
document.getElementById("vipPrice").value.trim();

const category =
document.getElementById("vipCategory").value;

if(number==="" || price===""){

alert("Please fill all fields");

return;

}

try{

if(editId){

await updateDoc(doc(db,"numbers",editId),{

number:number,

price:Number(price),

category:category

});

alert("✅ VIP Updated");

editId=null;

}else{

await addDoc(vipCollection,{

number:number,

price:Number(price),

category:category,

createdAt:new Date()

});

alert("✅ VIP Added");

}

document.getElementById("vipNumber").value="";
document.getElementById("vipPrice").value="";
document.getElementById("vipCategory").selectedIndex=0;

loadDashboard();
loadVIPTable();

}catch(err){

alert(err.message);

}

};

// =========================
// Delete
// =========================

window.deleteVIP = async function(id){

if(!confirm("Delete this VIP Number?")) return;

await deleteDoc(doc(db,"numbers",id));

loadDashboard();

loadVIPTable();

};

// =========================
// Edit
// =========================

window.editVIP = async function(id){

const snapshot =
await getDocs(vipCollection);

snapshot.forEach((item)=>{

if(item.id===id){

const data=item.data();

editId=id;

document.getElementById("vipNumber").value=data.number;

document.getElementById("vipPrice").value=data.price;

document.getElementById("vipCategory").value=data.category;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

};

// =========================
// Search
// =========================

window.searchVIP=function(){

const value=

document.getElementById("searchVIP")

.value.toLowerCase();

document

.querySelectorAll("#vipTableBody tr")

.forEach((row)=>{

row.style.display=

row.innerText

.toLowerCase()

.includes(value)

? ""

: "none";

});

};

// =========================
// Auto Refresh
// =========================

setInterval(()=>{

loadDashboard();

loadVIPTable();

},30000);

console.log("✅ Admin Final Part 2 Loaded");

// =========================
// Final Part 3
// Analytics + Notifications + Export
// =========================

// Dashboard Analytics
async function loadAnalytics(){

const snapshot = await getDocs(vipCollection);

let totalRevenue = 0;
let totalGold = 0;
let totalPremium = 0;
let totalSilver = 0;
let totalPlatinum = 0;

snapshot.forEach((item)=>{

const data = item.data();

totalRevenue += Number(data.price || 0);

switch(data.category){

case "Gold":
totalGold++;
break;

case "Premium":
totalPremium++;
break;

case "Silver":
totalSilver++;
break;

case "Platinum":
totalPlatinum++;
break;

}

});

console.log("Revenue :",totalRevenue);
console.log("Gold :",totalGold);
console.log("Premium :",totalPremium);
console.log("Silver :",totalSilver);
console.log("Platinum :",totalPlatinum);

}

loadAnalytics();

// =========================
// Export CSV
// =========================

window.exportCSV = async function(){

const snapshot = await getDocs(vipCollection);

let csv = "Number,Price,Category\n";

snapshot.forEach((item)=>{

const data = item.data();

csv +=
`${data.number},${data.price},${data.category}\n`;

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
// Backup JSON
// =========================

window.exportBackup = async function(){

const snapshot = await getDocs(vipCollection);

const backup=[];

snapshot.forEach((item)=>{

backup.push({

id:item.id,

...item.data()

});

});

const blob=new Blob(

[JSON.stringify(backup,null,2)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="VIP_Backup.json";

a.click();

};

// =========================
// Notifications
// =========================

function notify(text){

const area =
document.getElementById("recentActivity");

if(!area) return;

area.innerHTML =
"<p>"+text+"</p>" + area.innerHTML;

}

notify("✅ Dashboard Started");

// =========================
// Auto Analytics Refresh
// =========================

setInterval(()=>{

loadAnalytics();

},60000);

console.log("✅ Admin Final Part 3 Loaded");

// =========================
// Final Part 4
// Charts + Visitors + Reports
// =========================

// Demo Visitors
let visitors = 0;

function updateVisitors(){

visitors += Math.floor(Math.random()*5)+1;

const total =
document.getElementById("totalVisitors");

const online =
document.getElementById("onlineVisitors");

if(total)
total.innerHTML = visitors;

if(online)
online.innerHTML =
Math.floor(Math.random()*20)+1;

}

updateVisitors();

setInterval(updateVisitors,5000);

// =========================
// Chart.js
// =========================

function loadChart(){

const canvas =
document.getElementById("visitorChart");

if(!canvas) return;

new Chart(canvas,{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Visitors",

data:[12,25,18,40,55,35,60],

borderWidth:3,

fill:false,

tension:0.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

}

window.addEventListener("load",loadChart);

// =========================
// Monthly Report
// =========================

function monthlyReport(){

console.table({

Visitors:visitors,

Revenue:
document.getElementById("totalValue")?.innerText,

VIP:
document.getElementById("totalNumbers")?.innerText

});

}

setInterval(monthlyReport,120000);

// =========================
// Welcome Notification
// =========================

setTimeout(()=>{

notify("🎉 Welcome Maldev");

},1000);

// =========================
// Dashboard Health
// =========================

console.log("Firebase Connected");

console.log("Chart Ready");

console.log("Visitors Ready");

console.log("Admin Final Part 4 Loaded");

// =========================
// Final Part 5
// Logout + Settings + Final
// =========================

// Logout

window.logout = function(){

if(confirm("Logout Admin?")){

sessionStorage.removeItem("adminLogin");

window.location.href="login.html";

}

};

// Logout Button

document.querySelectorAll(".sidebar li").forEach((item)=>{

if(item.innerText.includes("Logout")){

item.onclick=logout;

}

});

// Website Settings

window.websiteSettings=function(){

alert("Website Settings Module Coming Soon");

};

// Export Excel

window.exportExcel=function(){

alert("Excel Export Coming Soon");

};

// Export PDF

window.exportPDF=function(){

alert("PDF Export Coming Soon");

};

// Refresh

window.refreshDashboard=async function(){

await loadDashboard();

await loadVIPTable();

await loadAnalytics();

notify("🔄 Dashboard Refreshed");

};

// Auto Refresh

setInterval(refreshDashboard,60000);

// Version

const VERSION="VIP Number Bazar V2.0";

console.log(VERSION);

// Ready

console.log("✅ Admin System Ready");

// Welcome

notify("🚀 VIP Number Bazar Admin Started");
