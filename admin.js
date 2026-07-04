// =======================================
// VIP Number Bazar V4 Professional
// admin.js - Part 1
// =======================================

import {
    db,
    auth,
    vipNumbersRef,
    ordersRef,
    customersRef,

    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,

    signOut,
    onAuthStateChanged

} from "./firebase.js";

// ============================
// Elements
// ============================

const loader = document.getElementById("loader");

const logoutBtn = document.getElementById("logoutBtn");

const vipForm = document.getElementById("vipForm");

const vipNumber = document.getElementById("vipNumber");

const vipPrice = document.getElementById("vipPrice");

const vipStatus = document.getElementById("vipStatus");

const vipTableBody = document.getElementById("vipTableBody");

const totalVipNumbers = document.getElementById("totalVipNumbers");

const totalOrders = document.getElementById("totalOrders");

const totalRevenue = document.getElementById("totalRevenue");

const totalCustomers = document.getElementById("totalCustomers");

const toast = document.getElementById("toast");

// ============================
// Login Check
// ============================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.replace("login.html");
        return;

    }

    history.replaceState(null, "", "admin.html");

    loader.style.display = "none";

    loadDashboard();

    loadVipNumbers();

});

// ============================
// Logout
// ============================

logoutBtn.addEventListener("click",async()=>{

    await signOut(auth);

    window.location.href="login.html";

});

// ============================
// Toast
// ============================

function showToast(message){

    toast.innerHTML=message;

    toast.style.display="block";

    setTimeout(()=>{

        toast.style.display="none";

    },2500);

}
// ============================
// Add VIP Number
// ============================

vipForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await addDoc(vipNumbersRef, {

            number: vipNumber.value.trim(),

            price: Number(vipPrice.value),

            status: vipStatus.value,

            category: "VIP",

            createdAt: new Date()

        });

        vipForm.reset();

        showToast("VIP Number Added Successfully");

        loadDashboard();

        loadVipNumbers();

    } catch (err) {

        alert(err.message);

    }

});


// ============================
// Dashboard
// ============================

async function loadDashboard() {

    const vipSnapshot = await getDocs(vipNumbersRef);

    const ordersSnapshot = await getDocs(ordersRef);

    const customersSnapshot = await getDocs(customersRef);

    let revenue = 0;

    vipSnapshot.forEach((item) => {

        const data = item.data();

        if (data.status === "Sold") {

            revenue += Number(data.price);

        }

    });

    totalVipNumbers.textContent = vipSnapshot.size;

    totalOrders.textContent = ordersSnapshot.size;

    totalCustomers.textContent = customersSnapshot.size;

    totalRevenue.textContent = "₹" + revenue;

}


// ============================
// Load VIP Numbers
// ============================

async function loadVipNumbers() {

    vipTableBody.innerHTML = "";

    const snapshot = await getDocs(vipNumbersRef);

    snapshot.forEach((item) => {

        const data = item.data();

        const row = document.createElement("tr");

        row.innerHTML = `

<td>${data.number}</td>

<td>₹${data.price}</td>

<td>

<span class="status ${data.status.toLowerCase()}">

${data.status}

</span>

</td>

<td>

<div class="action-buttons">

<button class="edit-btn">

Edit

</button>

<button class="delete-btn">

Delete

</button>

</div>

</td>

`;

        row.querySelector(".edit-btn").addEventListener("click", () => {

            openEditModal(item.id, data);

        });

        row.querySelector(".delete-btn").addEventListener("click", () => {

            removeVip(item.id);

        });

        vipTableBody.appendChild(row);

    });

}
// ============================
// Edit Modal Elements
// ============================

const editModal = document.getElementById("editModal");

const closeEditModal = document.getElementById("closeEditModal");

const editForm = document.getElementById("editForm");

const editId = document.getElementById("editId");

const editNumber = document.getElementById("editNumber");

const editPrice = document.getElementById("editPrice");

const editStatus = document.getElementById("editStatus");

// ============================
// Open Edit Modal
// ============================

function openEditModal(id, data) {

    editId.value = id;

    editNumber.value = data.number;

    editPrice.value = data.price;

    editStatus.value = data.status;

    editModal.style.display = "flex";

}

// ============================
// Close Modal
// ============================

closeEditModal.addEventListener("click", () => {

    editModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === editModal) {

        editModal.style.display = "none";

    }

});

// ============================
// Update VIP Number
// ============================

editForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await updateDoc(doc(db, "vipNumbers", editId.value), {

            number: editNumber.value.trim(),

            price: Number(editPrice.value),

            status: editStatus.value

        });

        editModal.style.display = "none";

        showToast("VIP Number Updated");

        loadDashboard();

        loadVipNumbers();

    }

    catch (err) {

        alert(err.message);

    }

});

// ============================
// Delete VIP Number
// ============================

async function removeVip(id) {

    if (!confirm("Delete this VIP Number?")) return;

    try {

        await deleteDoc(doc(db, "vipNumbers", id));

        showToast("VIP Number Deleted");

        loadDashboard();

        loadVipNumbers();

    }

    catch (err) {

        alert(err.message);

    }

}

// ============================
// Live Search
// ============================

const searchAdmin = document.getElementById("searchAdmin");

searchAdmin.addEventListener("keyup", () => {

    const keyword = searchAdmin.value.toLowerCase();

    const rows = vipTableBody.querySelectorAll("tr");

    rows.forEach((row) => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)

            ? ""

            : "none";

    });

});
// ===========================
// AUTO LOGOUT AFTER 10 MINUTES
// ===========================

let logoutTimer;

function startLogoutTimer() {

    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {

        document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:100px'>TIMEOUT WORKING</h1>";

   }, 5 * 60 * 1000);

}

["click", "mousemove", "keydown", "touchstart", "scroll"].forEach(event => {

    document.addEventListener(event, startLogoutTimer);

});

startLogoutTimer();
alert("Timer Started");
// ===========================
// BLOCK BACK BUTTON
// ===========================

history.pushState(null, null, location.href);

window.addEventListener("popstate", async () => {

    await signOut(auth);

    window.location.replace("login.html");

});
// ============================
// End of admin.js
// ============================
console.log("Menu Loaded");

const menuToggle = document.getElementById("menuToggle");
const sidebarMenu = document.querySelector(".sidebar-menu");

menuToggle.onclick = function () {
    sidebarMenu.classList.toggle("show");
};

