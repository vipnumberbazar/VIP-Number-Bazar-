// =======================================
// VIP Number Bazar Admin Panel
// admin.js - Part 1
// =======================================

// Local Storage

let vipNumbers =
JSON.parse(localStorage.getItem("vipNumbers")) || [];

// =========================
// Save Data
// =========================

function saveData(){

localStorage.setItem(
"vipNumbers",
JSON.stringify(vipNumbers)
);

}

// =========================
// Dashboard
// =========================

function updateDashboard(){

document.getElementById("totalNumbers").innerText =
vipNumbers.length;

let total = 0;

vipNumbers.forEach(item=>{

total += Number(item.price);

});

document.getElementById("totalValue").innerText =
"₹" + total.toLocaleString();

}

// =========================
// Add VIP Number
// =========================

function addVIP(){

const number =
document.getElementById("vipNumber").value.trim();

const price =
document.getElementById("vipPrice").value.trim();

const category =
document.getElementById("vipCategory").value;

if(number==="" || price===""){

alert("Please enter VIP Number and Price.");

return;

}

vipNumbers.push({

number,

price,

category

});

saveData();

showVIP();

updateDashboard();

document.getElementById("vipNumber").value="";

document.getElementById("vipPrice").value="";

}
// =========================
// Show VIP Numbers
// =========================

function showVIP(){

const vipList =
document.getElementById("vipList");

vipList.innerHTML = "";

vipNumbers.forEach((item,index)=>{

vipList.innerHTML += `

<div class="vip-item">

<h3>${item.number}</h3>

<p><strong>Price:</strong> ₹${Number(item.price).toLocaleString()}</p>

<p><strong>Category:</strong> ${item.category}</p>

<button onclick="editVIP(${index})">
✏️ Edit
</button>

<button onclick="deleteVIP(${index})">
🗑️ Delete
</button>

</div>

`;

});

}

// =========================
// Delete VIP
// =========================

function deleteVIP(index){

if(confirm("Delete this VIP Number?")){

vipNumbers.splice(index,1);

saveData();

showVIP();

updateDashboard();

}

}

// =========================
// Edit VIP
// =========================

function editVIP(index){

const item = vipNumbers[index];

document.getElementById("vipNumber").value =
item.number;

document.getElementById("vipPrice").value =
item.price;

document.getElementById("vipCategory").value =
item.category;

vipNumbers.splice(index,1);

saveData();

showVIP();

updateDashboard();

}

// =========================
// Search VIP
// =========================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value =
this.value.toLowerCase();

document.querySelectorAll(".vip-item").forEach(card=>{

if(card.innerText.toLowerCase().includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// =========================
// Load Data
// =========================

showVIP();

updateDashboard();

console.log("✅ Admin Panel Loaded Successfully");
