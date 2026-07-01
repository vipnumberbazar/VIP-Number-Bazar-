import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const vipCollection = collection(db, "numbers");

async function loadVIPNumbers() {

  const vipGrid = document.querySelector(".vip-grid");

  if (!vipGrid) return;

  vipGrid.innerHTML = "";

  try {

    const snapshot = await getDocs(vipCollection);
let bestPrice = 0;
let bestNumber = "";
    snapshot.forEach((item) => {

      const data = item.data();
      if (Number(data.price) > bestPrice) {
    bestPrice = Number(data.price);
    bestNumber = data.number;
      }
      const card = `
      <div class="vip-card reveal active" data-category="${String(data.category).toLowerCase()}">

        <div class="vip-badge">${data.category}</div>

        <h2>${data.number}</h2>

        <h3>₹${Number(data.price).toLocaleString()}</h3>

        <div class="vip-buttons">

          <button class="fav-btn">🤍</button>

          <button class="copy-btn" data-number="${data.number}">
            📋 Copy
          </button>

          <a href="#" class="whatsapp-btn"
             data-number="${data.number}"
             data-price="${data.price}">
             WhatsApp
          </a>

          <button class="buy-btn">
            Buy Now
          </button>

        </div>

      </div>
      `;

      vipGrid.insertAdjacentHTML("beforeend", card);

    });
  if (bestNumber) {
    document.getElementById("bestVIP").innerText = bestNumber;
    document.getElementById("bestPrice").innerText = "₹" + bestPrice.toLocaleString();
  }
    
  } catch (err) {

    console.error(err);

  }

}

// ===========================
// Copy Button
// ===========================

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("copy-btn")) {

    navigator.clipboard.writeText(e.target.dataset.number);

    e.target.innerHTML = "✅ Copied";

    setTimeout(() => {
      e.target.innerHTML = "📋 Copy";
    }, 2000);

  }

});

// ===========================
// WhatsApp Button
// ===========================

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("whatsapp-btn")) {

    e.preventDefault();

    const number = e.target.dataset.number;
    const price = e.target.dataset.price;

    const msg =
`Hello VIP Number Bazar,

I want this VIP Number.

📱 Number : ${number}
💰 Price : ₹${price}`;

    window.open(
      "https://wa.me/918070424242?text=" +
      encodeURIComponent(msg),
      "_blank"
    );

  }

});

// ===========================
// Favourite Button
// ===========================

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("fav-btn")) {

    e.target.innerHTML =
      e.target.innerHTML === "🤍"
      ? "❤️"
      : "🤍";

  }

});

// ===========================
// Search
// ===========================

const searchInput =
document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function () {

    const value =
    this.value.toLowerCase();

    document.querySelectorAll(".vip-card")
    .forEach((card) => {

      card.style.display =
      card.innerText.toLowerCase().includes(value)
      ? ""
      : "none";

    });

  });

}

// ===========================
// Dark Mode
// ===========================

const darkBtn =
document.getElementById("darkModeBtn");

if (darkBtn) {

  if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

  }

  darkBtn.onclick = () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode")
      ? "dark"
      : "light"
    );

  };

}

// ===========================
// Load Firebase
// ===========================

loadVIPNumbers();
async function saveVisitor() {

  try {

    await addDoc(collection(db, "visitors"), {
      name: "Guest",
      phone: "-",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      device: navigator.userAgent
    });

  } catch (e) {

    alert(e.message);
    console.error(e);

  }
}

// saveVisitor();
console.log("✅ Website Connected Successfully");
