// ======================================
// VIP NUMBER BAZAR V7
// script.js - Part 1
// ======================================

import {
db,
vipNumbersRef,
getDocs,
onSnapshot
} from "./firebase.js";

const loader = document.getElementById("loader");
const vipGrid = document.getElementById("vipNumbersGrid");

// Loader
window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) {
            loader.style.display = "none";
        }
    }, 600);
});

// VIP Card
function createVipCard(data) {

    return `
    <div class="vip-card">

        <h3>${data.number}</h3>

        <p>Price : ₹${data.price}</p>

        <p>Status : ${data.status}</p>

        <a
        class="btn"
        target="_blank"
        href="https://wa.me/918070424242?text=I%20want%20VIP%20Number%20${data.number}">
        Buy Now
        </a>

    </div>
    `;
}

// Load VIP Numbers
async function loadVipNumbers() {

    vipGrid.innerHTML = "<p>Loading...</p>";

    try {

        const snap = await getDocs(vipNumbersRef);

        vipGrid.innerHTML = "";

        snap.forEach(doc => {

            vipGrid.innerHTML += createVipCard(doc.data());

        });

    } catch (err) {

        console.log(err);

        vipGrid.innerHTML = "<p>Failed to Load VIP Numbers</p>";

    }

}

// Live Update
onSnapshot(vipNumbersRef, () => {

    loadVipNumbers();

});

// Start
loadVipNumbers();

console.log("VIP NUMBER BAZAR V7");
console.log("script.js Part 1 Loaded");
// ======================================
// VIP NUMBER BAZAR V7
// script.js - Part 2
// Search + Filter
// ======================================

// Search Box
const searchInput = document.getElementById("searchInput");

let allVipNumbers = [];

// Render VIP Cards
function renderVipNumbers(list){

    if(!vipGrid) return;

    vipGrid.innerHTML = "";

    if(list.length === 0){

        vipGrid.innerHTML = `
        <div class="vip-card">
            <h3>No VIP Number Found</h3>
        </div>
        `;

        return;
    }

    list.forEach(item=>{

        vipGrid.innerHTML += createVipCard(item);

    });

}

// Load & Store Data
async function loadVipNumbers(){

    try{

        const snap = await getDocs(vipNumbersRef);

        allVipNumbers = [];

        snap.forEach(doc=>{

            allVipNumbers.push(doc.data());

        });

        renderVipNumbers(allVipNumbers);

    }catch(error){

        console.log(error);

        vipGrid.innerHTML = `
        <div class="vip-card">
            <h3>Failed To Load Data</h3>
        </div>
        `;

    }

}

// Search
if(searchInput){

searchInput.addEventListener("input",()=>{

const value = searchInput.value.trim();

if(value===""){

renderVipNumbers(allVipNumbers);

return;

}

const filtered = allVipNumbers.filter(item=>{

return item.number.includes(value);

});

renderVipNumbers(filtered);

});

}

// Live Refresh
onSnapshot(vipNumbersRef,()=>{

loadVipNumbers();

});

console.log("script.js Part 2 Ready");
// ======================================
// VIP NUMBER BAZAR V7
// script.js - Part 3
// WhatsApp + Helpers
// ======================================

// Open WhatsApp
window.openWhatsApp = function(number, price){

    const message =
`Hello VIP NUMBER BAZAR,

I want to buy this VIP Number.

Number : ${number}
Price : ₹${price}`;

    window.open(
        "https://wa.me/918070424242?text=" +
        encodeURIComponent(message),
        "_blank"
    );

};

// Format Price
function formatPrice(price){

    return "₹" + Number(price).toLocaleString("en-IN");

}

// Update Card
function createVipCard(data){

return `

<div class="vip-card">

<h3>${data.number}</h3>

<p>${formatPrice(data.price)}</p>

<p>${data.status}</p>

<button
class="btn"
onclick="openWhatsApp('${data.number}','${data.price}')">

Buy Now

</button>

</div>

`;

}

console.log("script.js Part 3 Loaded");
