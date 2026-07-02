// =====================================
// VIP Number Bazar V3
// script.js Part 1
// =====================================

import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const vipContainer = document.getElementById("vipContainer");
const searchInput = document.getElementById("searchInput");

let vipNumbers = [];


// =====================================
// Load VIP Numbers
// =====================================

async function loadVipNumbers() {

    vipContainer.innerHTML = "<h3>Loading...</h3>";

    try {

        const snapshot = await getDocs(collection(db, "vipNumbers"));

        vipNumbers = [];

        snapshot.forEach((doc) => {

            const data = doc.data();

            // માત્ર Available નંબર બતાવવાના
            if (data.status === "Available") {

                vipNumbers.push({
                    id: doc.id,
                    ...data
                });

            }

        });

        displayNumbers(vipNumbers);

    }

    catch (error) {

        console.error(error);

        vipContainer.innerHTML = "<h3>Failed to load data.</h3>";

    }

}

// =====================================
// Display Numbers
// =====================================

function displayNumbers(list) {

    vipContainer.innerHTML = "";

    if (list.length === 0) {

        vipContainer.innerHTML = "<h3>No VIP Numbers Found.</h3>";

        return;

    }

    list.forEach((item) => {

        vipContainer.innerHTML += `

        <div class="vip-card">

            <div class="vip-number">
                ${item.number}
            </div>

            <div class="vip-category">
                ${item.category}
            </div>

            <div class="vip-price">
                ₹ ${Number(item.price).toLocaleString("en-IN")}
            </div>

            <div class="card-buttons">

                <a
                    class="book-btn"
                    href="#">
                    Book Now
                </a>

                <a
                    class="whatsapp-card-btn"
                    target="_blank"
                    href="https://wa.me/918070424242?text=Hello,%20I%20want%20to%20buy%20VIP%20Number%20${encodeURIComponent(item.number)}">

                    WhatsApp

                </a>

            </div>

        </div>

        `;

    });

}

loadVipNumbers();

// =====================================
// Live Search
// =====================================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = vipNumbers.filter((item) => {

        return (
            item.number.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value)
        );

    });

    displayNumbers(filtered);

});

