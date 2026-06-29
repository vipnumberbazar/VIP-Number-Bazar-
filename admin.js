import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const vipCollection = collection(db, "numbers");

let editId = null;

// ===========================
// Add / Update VIP Number
// ===========================

async function addVIP() {

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

if(editId){

await updateDoc(doc(db,"numbers",editId),{

number,
price,
category

});

editId=null;

}else{

await addDoc(vipCollection,{

number,
price,
category

});

}

document.getElementById("vipNumber").value="";
document.getElementById("vipPrice").value="";

loadVIP();

}
// ===========================
// Load VIP Numbers
// ===========================

async function loadVIP(){

const vipList = document.getElementById("vipList");

vipList.innerHTML = "";

const snapshot = await getDocs(vipCollection);

let total = 0;
let count = 0;

snapshot.forEach((item)=>{

const data = item.data();

count++;

total += Number(data.price);

vipList.innerHTML += `

<div class="vip-item">

<h3>${data.number}</h3>

<p><strong>Price:</strong> ₹${Number(data.price).toLocaleString()}</p>

<p><strong>Category:</strong> ${data.category}</p>

<button onclick="editVIP(
'${item.id}',
'${data.number}',
'${data.price}',
'${data.category}'
)">

✏️ Edit

</button>

<button onclick="deleteVIP('${item.id}')">

🗑 Delete

</button>

</div>

`;

});

document.getElementById("totalNumbers").innerText = count;
document.getElementById("totalValue").innerText =
"₹" + total.toLocaleString();

}

// ===========================
// Delete VIP
// ===========================

window.deleteVIP = async function(id){

if(confirm("Delete this VIP Number?")){

await deleteDoc(doc(db,"numbers",id));

loadVIP();

}

}

// ===========================
// Edit VIP
// ===========================

window.editVIP = function(id,number,price,category){

editId = id;

document.getElementById("vipNumber").value = number;
document.getElementById("vipPrice").value = price;
document.getElementById("vipCategory").value = category;

}
// ===========================
// Search
// ===========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

searchInput.addEventListener("keyup", function () {

const value = this.value.toLowerCase();

document.querySelectorAll(".vip-item").forEach(item => {

if (item.innerText.toLowerCase().includes(value)) {

item.style.display = "";

} else {

item.style.display = "none";

}

});

});

}

// ===========================
// Global Function
// ===========================

window.addVIP = addVIP;

// ===========================
// Load Data
// ===========================

loadVIP();

console.log("✅ Firebase Admin Panel Loaded");
