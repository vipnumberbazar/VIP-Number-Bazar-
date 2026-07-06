// ======================================
// VIP NUMBER BAZAR V7
// script.js
// Part 1
// ======================================

import {
db,
vipNumbersRef,
getDocs,
onSnapshot
} from "./firebase.js";

// ======================================
// DOM
// ======================================

const loader = document.getElementById("loader");
const vipGrid = document.getElementById("vipNumbersGrid");
const searchInput = document.getElementById("searchInput");

// ======================================
// Variables
// ======================================

let vipNumbers = [];

// ======================================
// Loader
// ======================================

window.addEventListener("load", () => {

setTimeout(() => {

if(loader){

loader.style.display = "none";

}

},600);

});

// ======================================
// Price Format
// ======================================

function formatPrice(price){

return "₹" + Number(price).toLocaleString("en-IN");

}

// ======================================
// Card
// ======================================

function createCard(item){

return `

<div class="vip-card">

<h3>${item.number}</h3>

<p>

Price :
<b>${formatPrice(item.price)}</b>

</p>

<p>

Status :
<b>${item.status}</b>

</p>

<button
class="btn"
onclick="buyNumber('${item.number}','${item.price}')">

Buy Now

</button>

</div>

`;

}

// ======================================
// Render
// ======================================

function renderCards(list){

if(!vipGrid) return;

vipGrid.innerHTML="";

if(list.length===0){

vipGrid.innerHTML=`

<div class="vip-card">

<h3>No VIP Number Found</h3>

</div>

`;

return;

}

list.forEach(item=>{

vipGrid.innerHTML += createCard(item);

});

}

// ======================================
// Console
// ======================================

console.log("VIP NUMBER BAZAR");
console.log("script.js Part 1 Loaded");
// ======================================
// VIP NUMBER BAZAR V7
// script.js
// Part 2
// ======================================

// Load VIP Numbers
async function loadVipNumbers(){

    if(vipGrid){

        vipGrid.innerHTML = `
        <div class="vip-card">
            <h3>Loading...</h3>
        </div>`;
    }

    try{

        const snapshot = await getDocs(vipNumbersRef);

        vipNumbers = [];

        snapshot.forEach((doc)=>{

            vipNumbers.push({

                id:doc.id,

                ...doc.data()

            });

        });

        renderCards(vipNumbers);

    }catch(error){

        console.error(error);

        vipGrid.innerHTML = `
        <div class="vip-card">
            <h3>Failed To Load VIP Numbers</h3>
        </div>`;
    }

}

// ======================================
// Search
// ======================================

if(searchInput){

searchInput.addEventListener("input",()=>{

const keyword = searchInput.value
.toLowerCase()
.trim();

if(keyword===""){

renderCards(vipNumbers);

return;

}

const result = vipNumbers.filter(item=>{

return String(item.number)
.toLowerCase()
.includes(keyword);

});

renderCards(result);

});

}

// ======================================
// Live Firestore Update
// ======================================

onSnapshot(vipNumbersRef,()=>{

loadVipNumbers();

});

console.log("script.js Part 2 Loaded");
// ======================================
// VIP NUMBER BAZAR V7
// script.js
// Part 3
// ======================================

// WhatsApp Buy
window.buyNumber = function(number, price){

const message =

`Hello VIP NUMBER BAZAR,

I want to Buy this VIP Number.

VIP Number : ${number}

Price : ₹${price}`;

window.open(

"https://wa.me/918070424242?text="+

encodeURIComponent(message),

"_blank"

);

};

// ======================================
// Status Badge
// ======================================

function getStatusBadge(status){

if(!status){

return `<span class="badge available">
AVAILABLE
</span>`;

}

status=status.toLowerCase();

if(status==="sold"){

return `<span class="badge sold">
SOLD
</span>`;

}

return `<span class="badge available">
AVAILABLE
</span>`;

}

// ======================================
// New Card Design
// ======================================

function createCard(item){

return `

<div class="vip-card">

<div class="vip-top">

<h2>${item.number}</h2>

${getStatusBadge(item.status)}

</div>

<h3>

${formatPrice(item.price)}

</h3>

<button

class="btn"

onclick="buyNumber('${item.number}','${item.price}')"

${item.status==="Sold"?"disabled":""}>

${item.status==="Sold"?"SOLD":"BUY NOW"}

</button>

</div>

`;

}

// ======================================
// Auto Refresh
// ======================================

setInterval(()=>{

loadVipNumbers();

},30000);

// ======================================

console.log(

"script.js Part 3 Ready"

);
// ======================================
// VIP NUMBER BAZAR V7
// script.js Part 4 (Final)
// ======================================

// Internet Status
window.addEventListener("online", () => {
    console.log("Internet Connected");
    loadVipNumbers();
});

window.addEventListener("offline", () => {
    console.log("Internet Disconnected");
    alert("No Internet Connection");
});

// Hide Loader
function hideLoader() {
    if (loader) {
        loader.style.display = "none";
    }
}

// Initialize Website
async function initializeWebsite() {

    try {

        await loadVipNumbers();

        hideLoader();

        console.log("VIP NUMBER BAZAR Ready");

    } catch (error) {

        console.error(error);

        hideLoader();

    }

}

// Start Website
initializeWebsite();

console.log("script.js Final Loaded");
