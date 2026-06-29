// =======================================
// VIP Number Bazar V3
// script.js - Part 1
// =======================================

// Page Loaded
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =========================
// Dark Mode
// =========================

const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}

// =========================
// Back To Top
// =========================

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

// =========================
// Reveal Animation
// =========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
// =========================
// Live Search
// =========================

const searchInput = document.getElementById("searchInput");
const vipCards = document.querySelectorAll(".vip-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        vipCards.forEach(card => {

            if (card.innerText.toLowerCase().includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// =========================
// Category Filter
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        vipCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// =========================
// Copy VIP Number
// =========================

document.querySelectorAll(".copy-btn").forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        navigator.clipboard.writeText(number);

        button.innerHTML = "✅ Copied";

        setTimeout(() => {

            button.innerHTML = "📋 Copy";

        }, 2000);

    });

});

// =========================
// Favorite Button
// =========================

document.querySelectorAll(".fav-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (button.innerHTML === "🤍") {

            button.innerHTML = "❤️";

        } else {

            button.innerHTML = "🤍";

        }

    });

});
// =========================
// WhatsApp Button
// =========================

document.querySelectorAll(".whatsapp-btn").forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const number = button.dataset.number;
        const price = button.dataset.price;

        const message =
`Hello VIP Number Bazar,

I want to buy this VIP Number.

📱 Number : ${number}
💰 Price : ₹${price}

Please send complete details.`;

        const url =
"https://wa.me/918070424242?text=" +
encodeURIComponent(message);

        window.open(url, "_blank");

    });

});

// =========================
// Buy Now
// =========================

document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", () => {

        alert(
"Thank you for your interest!\n\nPlease contact us on WhatsApp to complete your purchase."
        );

    });

});

// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// =========================
// Console
// =========================

console.log(
"✅ VIP Number Bazar V3 Loaded Successfully"
);
