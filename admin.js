const searchInput = document.getElementById("searchInput");
const cards = document.getElementById("numberContainer");

searchInput.addEventListener("keyup", function () {

  const value = this.value.toLowerCase();

  const allCards = document.querySelectorAll(".vip-card");

  allCards.forEach(card => {

    const number = card.querySelector(".number").innerText.toLowerCase();

    if (number.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});

document.querySelectorAll(".whatsappBtn").forEach(btn => {

  btn.addEventListener("click", () => {

    window.open(
      "https://wa.me/916354312829?text=Hello, I want to book a VIP Number",
      "_blank"
    );

  });

});

document.querySelectorAll(".buyBtn").forEach(btn => {

  btn.addEventListener("click", () => {

    alert("Booking System Coming Soon");

  });

});
// Operator Filter

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

document.querySelector(".filter.active")?.classList.remove("active");

button.classList.add("active");

const operator = button.innerText.toLowerCase();

document.querySelectorAll(".vip-card").forEach(card => {

const cardOperator = card.querySelector(".operator").innerText.toLowerCase();

if(operator==="all"){

card.style.display="block";

}else{

card.style.display =
cardOperator===operator ? "block":"none";

}

});

});

});

// Book Now

document.querySelectorAll(".buyBtn").forEach(btn=>{

btn.addEventListener("click",()=>{

window.open(
"https://wa.me/916354312829?text=I want to book this VIP Number",
"_blank"
);

});

});

// Auto Year

const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML=
`© ${new Date().getFullYear()} VIP Number Bazar. All Rights Reserved.`;

}
// ===============================
// VIP Number Bazar V2
// script.js - Part 1
// ===============================

// Loader
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// Search Function
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".vip-card");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.indexOf(value) > -1) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });
}
// ===============================
// VIP Number Bazar V2
// script.js - Part 2
// WhatsApp + Copy + Filter
// ===============================

// Copy VIP Number
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        const number = this.getAttribute("data-number");

        navigator.clipboard.writeText(number);

        this.innerHTML = "✅ Copied";

        setTimeout(() => {
            this.innerHTML = "📋 Copy";
        }, 2000);

    });
});

// WhatsApp Inquiry
document.querySelectorAll(".whatsapp-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        const number = this.getAttribute("data-number");
        const price = this.getAttribute("data-price");

        const msg =
`Hello VIP Number Bazar,

I am interested in this VIP Number.

📱 Number : ${number}
💰 Price : ₹${price}

Please send more details.`;

        const url =
"https://wa.me/918070424242?text=" +
encodeURIComponent(msg);

        window.open(url, "_blank");

    });

});

// Category Filter
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const filter = btn.dataset.filter;

        document.querySelectorAll(".vip-card").forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
// ===============================
// VIP Number Bazar V2
// script.js - Part 3
// Dark Mode + Scroll Effects
// ===============================

// Dark Mode
const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkBtn.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkBtn.innerHTML = "🌙";
        }

    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        darkBtn.innerHTML = "☀️";
    }
}

// Back To Top Button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

if (topBtn) {
    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}

// Scroll Animation
const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// ===============================
// VIP Number Bazar V2
// script.js - Part 4 (Final)
// ===============================

// Price Calculator
const priceInput = document.getElementById("priceInput");
const gstOutput = document.getElementById("gstPrice");
const totalOutput = document.getElementById("totalPrice");

if (priceInput && gstOutput && totalOutput) {

    priceInput.addEventListener("input", () => {

        let price = parseFloat(priceInput.value) || 0;

        let gst = (price * 18) / 100;
        let total = price + gst;

        gstOutput.innerText = "₹" + gst.toFixed(2);
        totalOutput.innerText = "₹" + total.toFixed(2);

    });

}

// Favorite System
document.querySelectorAll(".fav-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        this.classList.toggle("active");

        if (this.classList.contains("active")) {
            this.innerHTML = "❤️";
        } else {
            this.innerHTML = "🤍";
        }

    });

});

// Current Year (Footer)
const year = document.getElementById("year");

if (year) {
    year.innerText = new Date().getFullYear();
}

// Smooth Navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

// Console Message
console.log("✅ VIP Number Bazar V2 Loaded Successfully");
// ================================
// VIP Number Bazar Admin Panel
// Part 2
// ================================

let vipNumbers = JSON.parse(localStorage.getItem("vipNumbers")) || [];

function addVIP() {

    const number = document.getElementById("vipNumber").value.trim();
    const price = document.getElementById("vipPrice").value.trim();
    const category = document.getElementById("vipCategory").value;

    if (number === "" || price === "") {
        alert("Please fill all fields.");
        return;
    }

    vipNumbers.push({
        number,
        price,
        category
    });

    saveData();
    showVIP();

    document.getElementById("vipNumber").value = "";
    document.getElementById("vipPrice").value = "";
}

function showVIP() {

    const list = document.getElementById("vipList");

    list.innerHTML = "";

    vipNumbers.forEach((item, index) => {

        list.innerHTML += `
        <div class="vip-item">
            <h3>${item.number}</h3>

            <p>₹${item.price}</p>

            <p>${item.category}</p>

            <button onclick="deleteVIP(${index})">
                Delete
            </button>
        </div>
        `;

    });

}

function deleteVIP(index) {

    if (confirm("Delete this VIP Number?")) {

        vipNumbers.splice(index, 1);

        saveData();
        showVIP();

    }

}

function saveData() {

    localStorage.setItem(
        "vipNumbers",
        JSON.stringify(vipNumbers)
    );

}

showVIP();
// ================================
// VIP Number Bazar Admin Panel
// Part 3 - Search + Edit + Dashboard
// ================================

// Dashboard Summary
function updateDashboard() {

    const totalNumbers = vipNumbers.length;

    let totalValue = 0;

    vipNumbers.forEach(item => {
        totalValue += Number(item.price);
    });

    const totalBox = document.getElementById("totalNumbers");
    const valueBox = document.getElementById("totalValue");

    if (totalBox) totalBox.innerHTML = totalNumbers;
    if (valueBox) valueBox.innerHTML = "₹" + totalValue;
}

// Edit VIP Number
function editVIP(index) {

    document.getElementById("vipNumber").value =
        vipNumbers[index].number;

    document.getElementById("vipPrice").value =
        vipNumbers[index].price;

    document.getElementById("vipCategory").value =
        vipNumbers[index].category;

    vipNumbers.splice(index, 1);

    saveData();
    showVIP();
}

// Search
function searchVIP() {

    const value =
        document.getElementById("searchInput").value.toLowerCase();

    document.querySelectorAll(".vip-item").forEach(item => {

        if (item.innerText.toLowerCase().includes(value)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });

}

// Old showVIP ને Replace કરો
function showVIP() {

    const list = document.getElementById("vipList");

    list.innerHTML = "";

    vipNumbers.forEach((item, index) => {

        list.innerHTML += `
        <div class="vip-item">

            <h3>${item.number}</h3>

            <p>₹${item.price}</p>

            <p>${item.category}</p>

            <button onclick="editVIP(${index})">
                ✏️ Edit
            </button>

            <button onclick="deleteVIP(${index})">
                🗑 Delete
            </button>

        </div>
        `;

    });

    updateDashboard();

},
