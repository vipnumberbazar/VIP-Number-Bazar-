import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const vipContainer = document.getElementById("vipContainer");
const searchInput = document.getElementById("searchInput");

let vipNumbers = [];

// Load VIP Numbers
async function loadVipNumbers() {

    try {

        const snapshot = await getDocs(collection(db, "vipNumbers"));

        vipNumbers = [];

        snapshot.forEach((doc) => {

            const data = doc.data();

            if (data.status === "Available") {

                vipNumbers.push({
                    id: doc.id,
                    number: data.number,
                    category: data.category,
                    price: data.price
                });

            }

        });

        displayNumbers(vipNumbers);

    } catch (error) {

        vipContainer.innerHTML = "<h2>Failed to Load Data</h2>";
        console.error(error);

    }

}

// Display Numbers
function displayNumbers(list) {

    vipContainer.innerHTML = "";

    if (list.length === 0) {

        vipContainer.innerHTML = "<h2>No VIP Numbers Found</h2>";
        return;

    }

    list.forEach((item) => {

        const card = document.createElement("div");
        card.className = "vip-card";

        card.innerHTML = `
            <div class="vip-number">${item.number}</div>

            <div class="vip-category">${item.category}</div>

            <div class="vip-price">₹ ${item.price}</div>

            <div class="card-buttons">

                <a class="book-btn" href="#">
                    Book Now
                </a>

                <a class="whatsapp-card-btn"
                   target="_blank"
                   href="https://wa.me/918070424242?text=Hello, I want VIP Number ${item.number}">
                    WhatsApp
                </a>

            </div>
        `;

        vipContainer.appendChild(card);

    });

}

// Search
searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = vipNumbers.filter(item =>
        item.number.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );

    displayNumbers(filtered);

});

loadVipNumbers();
