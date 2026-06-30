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

// =======================
// Dashboard
// =======================

async function loadDashboard(){

const snapshot = await getDocs(vipCollection);

let totalNumbers = 0;
let totalValue = 0;

snapshot.forEach((item)=>{

const data = item.data();

totalNumbers++;

totalValue += Number(data.price || 0);

});

document.getElementById("totalNumbers").textContent = totalNumbers;

document.getElementById("totalValue").textContent =
"₹" + totalValue.toLocaleString();

}

async function loadVIPTable(){

const tbody =
document.getElementById("vipTableBody");

if(!tbody) return;

tbody.innerHTML = "";

const snapshot = await getDocs(vipCollection);

snapshot.forEach((item)=>{

const data = item.data();

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

async function refreshDashboard(){

await loadDashboard();

await loadVIPTable();

}

refreshDashboard();

console.log("✅ Admin Final Part 1 Loaded");

// =======================
// Add VIP
// =======================

window.addVIP = async function(){

const number =
document.getElementById("vipNumber").value.trim();

const price =
document.getElementById("vipPrice").value.trim();

const category =
document.getElementById("vipCategory").value;

if(!number || !price){

alert("બધી માહિતી ભરો");

return;

}

try{

if(editId){

await updateDoc(doc(db,"numbers",editId),{

number,
price:Number(price),
category

});

alert("✅ VIP Number Updated");

editId=null;

}else{

await addDoc(vipCollection,{

number,
price:Number(price),
category,
createdAt:new Date()

});

alert("✅ VIP Number Added");

}

document.getElementById("vipNumber").value="";
document.getElementById("vipPrice").value="";
document.getElementById("vipCategory").selectedIndex=0;

refreshDashboard();

}catch(err){

alert(err.message);

}

};

// =======================
// Delete VIP
// =======================

window.deleteVIP = async function(id){

if(!confirm("Delete this VIP Number?")) return;

await deleteDoc(doc(db,"numbers",id));

refreshDashboard();

};

// =======================
// Edit VIP
// =======================

window.editVIP = async function(id){

const snapshot = await getDocs(vipCollection);

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

// =======================
// Search
// =======================

window.searchVIP = function(){

const value =
document.getElementById("searchVIP")
.value.toLowerCase();

document
.querySelectorAll("#vipTableBody tr")
.forEach((row)=>{

row.style.display =
row.innerText.toLowerCase().includes(value)
? ""
: "none";

});

};

console.log("✅ Admin Final Part 2 Loaded");

// =======================
// Analytics
// =======================

async function loadAnalytics(){

const snapshot = await getDocs(vipCollection);

let totalRevenue = 0;

let gold = 0;
let premium = 0;
let silver = 0;
let platinum = 0;

snapshot.forEach((item)=>{

const data = item.data();

totalRevenue += Number(data.price || 0);

switch(data.category){

case "Gold":
gold++;
break;

case "Premium":
premium++;
break;

case "Silver":
silver++;
break;

case "Platinum":
platinum++;
break;

}

});

const revenue =
document.getElementById("todayRevenue");

if(revenue){

revenue.innerHTML =
"₹"+totalRevenue.toLocaleString();

}

console.table({

Gold:gold,

Premium:premium,

Silver:silver,

Platinum:platinum,

Revenue:totalRevenue

});

}

// =======================
// Export CSV
// =======================

window.exportCSV = async function(){

const snapshot = await getDocs(vipCollection);

let csv = "Number,Price,Category\n";

snapshot.forEach((item)=>{

const d = item.data();

csv += `${d.number},${d.price},${d.category}\n`;

});

const blob = new Blob([csv],{
type:"text/csv"
});

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"VIP_Numbers.csv";

link.click();

};

// =======================
// Backup JSON
// =======================

window.exportBackup = async function(){

const snapshot = await getDocs(vipCollection);

const backup = [];

snapshot.forEach((item)=>{

backup.push({

id:item.id,

...item.data()

});

});

const blob = new Blob(

[JSON.stringify(backup,null,2)],

{type:"application/json"}

);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"VIP_Backup.json";

link.click();

};

// =======================
// Notifications
// =======================

function notify(msg){

const box =
document.getElementById("recentActivity");

if(!box) return;

box.innerHTML =
`<p>${msg}</p>` + box.innerHTML;

}

notify("✅ Dashboard Loaded");

// =======================
// Auto Refresh
// =======================

setInterval(async()=>{

await refreshDashboard();

await loadAnalytics();

},30000);

console.log("✅ Admin Final Part 3 Loaded");

// =======================
// Final Part 4
// Charts + Visitors + Logout
// =======================

// Demo Visitor Counter
let visitorCount = 125;

function updateVisitors(){

visitorCount += Math.floor(Math.random()*3);

const totalVisitors =
document.getElementById("totalVisitors");

const onlineVisitors =
document.getElementById("onlineVisitors");

if(totalVisitors)
totalVisitors.innerHTML = visitorCount;

if(onlineVisitors)
onlineVisitors.innerHTML =
Math.floor(Math.random()*20)+5;

}

updateVisitors();

setInterval(updateVisitors,5000);

// =======================
// Chart
// =======================

window.addEventListener("load",()=>{

const chart =
document.getElementById("visitorChart");

if(!chart) return;

new Chart(chart,{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Visitors",

data:[15,32,28,45,60,52,78],

borderWidth:3,

fill:false,

tension:.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

});

// =======================
// Logout
// =======================

window.logout=function(){

if(confirm("Logout Admin?")){

sessionStorage.removeItem("adminLogin");

location.href="login.html";

}

};

// Sidebar Logout

document.querySelectorAll(".sidebar li").forEach((item)=>{

if(item.innerText.includes("Logout")){

item.onclick = logout;

}

});

// =======================
// System Ready
// =======================

console.log("🚀 VIP Number Bazar Admin Ready");

// =======================
// Final Part 5
// Production Ready
// =======================

// Website Settings
window.websiteSettings = function(){

alert("Website Settings Coming Soon");

};

// Export Excel
window.exportExcel = function(){

alert("Excel Export Coming Soon");

};

// Export PDF
window.exportPDF = function(){

alert("PDF Export Coming Soon");

};

// Refresh Dashboard
window.refreshDashboard = async function(){

await loadDashboard();

await loadVIPTable();

await loadAnalytics();
 await loadHighestVIP();

notify("🔄 Dashboard Refreshed");

};

// Refresh Button
const refreshBtn = document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.onclick = refreshDashboard;

}

// Greeting
function greeting(){

const hour = new Date().getHours();

let text = "Welcome";

if(hour < 12){

text = "🌞 Good Morning";

}else if(hour < 18){

text = "☀️ Good Afternoon";

}else{

text = "🌙 Good Evening";

}

const greet = document.getElementById("greeting");

if(greet){

greet.innerHTML = text + ", Maldev";

}

}

greeting();

// Live Clock
function liveClock(){

const clock = document.getElementById("liveClock");

if(!clock) return;

clock.innerHTML = new Date().toLocaleString();
}

setInterval(liveClock,1000);

liveClock();

// Version
console.log("VIP Number Bazar Admin V2.0");

// Initial Load
(async()=>{

await refreshDashboard();

notify("🚀 Admin Panel Ready");

})();
