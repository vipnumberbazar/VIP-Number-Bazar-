// ===============================
// VIP Number Bazar - admin.js
// Part 1
// ===============================

import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// ===============================
// DOM Elements
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

const addNumberForm = document.getElementById("addNumberForm");

const numbersTable = document.getElementById("numbersTable");

const totalNumbers = document.getElementById("totalNumbers");


// ===============================
// Login Check
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});


// ===============================
// Logout
// ===============================

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        alert("Logout Successfully");

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

});

// ===============================
// Add VIP Number to Firebase
// ===============================

addNumberForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const vipNumber = document.getElementById("vipNumber").value.trim();

    const vipPrice = Number(document.getElementById("vipPrice").value);

    const vipCategory = document.getElementById("vipCategory").value;

    if (!vipNumber || !vipPrice) {

        alert("Please fill all fields.");

        return;

    }

    try {

        await addDoc(collection(db, "vipNumbers"), {

            number: vipNumber,

            price: vipPrice,

            category: vipCategory,

            status: "Available",

            createdAt: Date.now()

        });

        alert("VIP Number Added Successfully ✅");

        addNumberForm.reset();

        loadVipNumbers();

    }

    catch (error) {

        console.error(error);

        alert("Error : " + error.message);

    }

});


// ===============================
// Load VIP Numbers
// ===============================

async function loadVipNumbers() {

    numbersTable.innerHTML = "";

    const snapshot = await getDocs(collection(db, "vipNumbers"));

    totalNumbers.innerText = snapshot.size;

    let sr = 1;

    snapshot.forEach((doc) => {

        const data = doc.data();

        numbersTable.innerHTML += `

            <tr>

                <td>${sr++}</td>

                <td>${data.number}</td>

                <td>${data.category}</td>

                <td>₹ ${data.price}</td>

                <td>
                    <span class="status available">
                        ${data.status}
                    </span>
                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        data-id="${doc.id}">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-id="${doc.id}">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

loadVipNumbers();

// ===============================
// Delete VIP Number
// ===============================

import {
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

document.addEventListener("click", async (e) => {

    // Delete Button
    if (e.target.closest(".delete-btn")) {

        const id = e.target.closest(".delete-btn").dataset.id;

        const confirmDelete = confirm("Are you sure you want to delete this VIP Number?");

        if (!confirmDelete) return;

        try {

            await deleteDoc(doc(db, "vipNumbers", id));

            alert("VIP Number Deleted Successfully ✅");

            loadVipNumbers();

        } catch (error) {

            alert(error.message);

        }

    }

    // Edit Button
    if (e.target.closest(".edit-btn")) {

        const id = e.target.closest(".edit-btn").dataset.id;

        const newPrice = prompt("Enter New Price");

        if (!newPrice) return;

        try {

            await updateDoc(doc(db, "vipNumbers", id), {

                price: Number(newPrice)

            });

            alert("Price Updated Successfully ✅");

            loadVipNumbers();

        } catch (error) {

            alert(error.message);

        }

    }

});


// ===============================
// Search VIP Number
// ===============================

const searchNumber = document.getElementById("searchNumber");

searchNumber.addEventListener("keyup", () => {

    const value = searchNumber.value.toLowerCase();

    const rows = numbersTable.querySelectorAll("tr");

    rows.forEach((row) => {

        const text = row.innerText.toLowerCase();

        row.style.display = text.includes(value) ? "" : "none";

    });

});

// ===============================
// Dashboard Summary
// ===============================

const totalCustomers = document.getElementById("totalCustomers");
const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");

async function loadDashboard() {

    try {

        // Customers Count
        const customerSnapshot = await getDocs(collection(db, "customers"));
        totalCustomers.innerText = customerSnapshot.size;

        // Orders Count
        const orderSnapshot = await getDocs(collection(db, "orders"));
        totalOrders.innerText = orderSnapshot.size;

        // Revenue
        let revenue = 0;

        orderSnapshot.forEach((doc) => {

            const data = doc.data();

            if (data.price) {
                revenue += Number(data.price);
            }

        });

        totalRevenue.innerText = "₹ " + revenue.toLocaleString("en-IN");

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// Auto Refresh Dashboard
// ===============================

async function refreshDashboard() {

    await loadVipNumbers();

    await loadDashboard();

}

// First Load
refreshDashboard();

// Auto Refresh Every 30 Seconds
setInterval(refreshDashboard, 30000);
