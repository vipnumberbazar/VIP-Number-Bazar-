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
