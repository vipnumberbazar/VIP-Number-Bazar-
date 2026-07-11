// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// script.js Part 1
// ==========================================

import {
    vipNumbersRef,
    getDocs
} from "./firebase.js";

// ==============================
// DOM Elements
// ==============================

const loader = document.getElementById("loader");
const vipGrid = document.getElementById("vipNumbersGrid");
const searchInput = document.getElementById("searchInput");

// ==============================
// Variables
// ==============================

let vipNumbers = [];
let filteredNumbers = [];

// ==============================
// Loader
// ==============================

function showLoader() {
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    if (loader) loader.style.display = "none";
}

// ==============================
// Price Formatter
// ==============================

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

// ==============================
// Status Badge
// ==============================

function getStatusBadge(status) {

    if (!status) {
        return `<span class="badge available">AVAILABLE</span>`;
    }

    if (status.toLowerCase() === "sold") {
        return `<span class="badge sold">SOLD</span>`;
    }

    return `<span class="badge available">AVAILABLE</span>`;
}

// ==============================
// VIP Card
// ==============================

function createCard(item) {

    return `

<div class="vip-card">

<div class="vip-top">

<h2>${item.number}</h2>

${getStatusBadge(item.status)}

</div>

<h3>${formatPrice(item.price)}</h3>

<button
class="btn"
onclick="buyNumber('${item.number}','${item.price}')"
${item.status === "Sold" ? "disabled" : ""}>

${item.status === "Sold" ? "SOLD" : "BOOK NOW"}

</button>

</div>

`;

}

console.log("VIP NUMBER BAZAR");
console.log("script.js Part 1 Loaded");
// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// script.js Part 2
// ==========================================

// ==============================
// Render VIP Cards
// ==============================

function renderCards(list) {

    if (!vipGrid) return;

    vipGrid.innerHTML = "";

    if (list.length === 0) {

        vipGrid.innerHTML = `

<div class="vip-card">

<h2>No VIP Numbers Found</h2>

<p>Please try another search.</p>

</div>

`;

        return;
    }

    list.forEach(item => {

        vipGrid.innerHTML += createCard(item);

    });

}

// ==============================
// Load VIP Numbers
// ==============================

async function loadVipNumbers() {

    try {

        showLoader();

        const snapshot = await getDocs(vipNumbersRef);

        vipNumbers = [];

        snapshot.forEach(doc => {

            vipNumbers.push({

                id: doc.id,
                ...doc.data()

            });

        });

        filteredNumbers = [...vipNumbers];

        renderCards(filteredNumbers);

        hideLoader();

    } catch (error) {

        console.error("Load Error:", error);

        hideLoader();

        vipGrid.innerHTML = `

<div class="vip-card">

<h2>Failed to Load Data</h2>

<p>Please refresh the page.</p>

</div>

`;

    }

}

// ==============================
// Search
// ==============================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        if (keyword === "") {

            filteredNumbers = [...vipNumbers];

        } else {

            filteredNumbers = vipNumbers.filter(item =>

                String(item.number)
                .toLowerCase()
                .includes(keyword)

            );

        }

        renderCards(filteredNumbers);

    });

}

console.log("script.js Part 2 Loaded");
// ==========================================
// VIP NUMBER BAZAR ENTERPRISE v1.0
// script.js Part 3 (Final)
// ==========================================

// ==============================
// WhatsApp Booking
// ==============================

window.buyNumber = function(number, price) {

    const message =
`Hello VIP NUMBER BAZAR,

I want to book this VIP Number.

VIP Number : ${number}

Price : ₹${price}

Please contact me.`;

    window.open(
        "https://wa.me/918070424242?text=" +
        encodeURIComponent(message),
        "_blank"
    );

};

// ==============================
// Initialize Website
// ==============================

async function initializeWebsite() {

    await loadVipNumbers();

}

// ==============================
// Page Loaded
// ==============================

window.addEventListener("load", () => {

    initializeWebsite();

});

// ==============================
// Service Worker
// ==============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .catch(error => console.log(error));

    });

}

console.log("VIP NUMBER BAZAR ENTERPRISE v1.0");
console.log("script.js Ready");
