// =======================================
// VIP Number Bazar V5 Professional
// admin.js
// Part 1
// =======================================

import {

    db,
    auth,

    vipNumbersRef,
    ordersRef,
    customersRef,
    visitorsRef,
    notificationsRef,

    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,

    signOut,
    onAuthStateChanged

} from "./firebase.js";

// =======================================
// DOM Elements
// =======================================

const loader = document.getElementById("loader");

const logoutBtn = document.getElementById("logoutBtn");

const pageTitle = document.getElementById("pageTitle");

const sidebarItems = document.querySelectorAll(".sidebar-menu li");

const pages = document.querySelectorAll(".page");

const loadingOverlay = document.getElementById("loadingOverlay");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const scrollTopBtn = document.getElementById("scrollTopBtn");

const vipTableBody = document.getElementById("vipTableBody");

const ordersTableBody = document.getElementById("ordersTableBody");

const customersTableBody = document.getElementById("customersTableBody");

const visitorTableBody = document.getElementById("visitorTableBody");

const notificationList = document.getElementById("notificationList");
// =======================================
// Authentication Check
// =======================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.replace("login.html");

        return;

    }

    loader.style.display = "none";

    initializeDashboard();

});

// =======================================
// Initialize Dashboard
// =======================================

async function initializeDashboard() {

    loadDashboard();

    loadVipNumbers();

    loadOrders();

    loadCustomers();

    loadVisitors();

    loadNotifications();

    startAutoLogout();

}

// =======================================
// Sidebar Navigation
// =======================================

sidebarItems.forEach((item) => {

    item.addEventListener("click", () => {

        sidebarItems.forEach((i) =>

            i.classList.remove("active")

        );

        pages.forEach((p) =>

            p.classList.remove("active")

        );

        item.classList.add("active");

        const page = item.dataset.page;

        document
            .getElementById(page + "Page")
            .classList.add("active");

        pageTitle.textContent = item.innerText.trim();

    });

});
// =======================================
// Dashboard Counters
// =======================================

async function loadDashboard() {

    const vipSnapshot = await getDocs(vipNumbersRef);

    const ordersSnapshot = await getDocs(ordersRef);

    const customersSnapshot = await getDocs(customersRef);

    const visitorsSnapshot = await getDocs(visitorsRef);

    document.getElementById("totalVipNumbers").textContent =
        vipSnapshot.size;

    document.getElementById("totalOrders").textContent =
        ordersSnapshot.size;

    document.getElementById("totalCustomers").textContent =
        customersSnapshot.size;

    document.getElementById("totalVisitors").textContent =
        visitorsSnapshot.size;

    let available = 0;

    let sold = 0;

    let revenue = 0;

    vipSnapshot.forEach((docItem) => {

        const data = docItem.data();

        if (data.status === "Available") {

            available++;

        }

        if (data.status === "Sold") {

            sold++;

            revenue += Number(data.price || 0);

        }

    });

    document.getElementById("availableNumbers").textContent =
        available;

    document.getElementById("soldNumbers").textContent =
        sold;

    document.getElementById("totalRevenue").textContent =
        "₹" + revenue.toLocaleString();

    document.getElementById("todayVisitors").textContent =
        visitorsSnapshot.size;

}
// =======================================
// Load VIP Numbers
// =======================================

async function loadVipNumbers() {

    vipTableBody.innerHTML = "";

    const snapshot = await getDocs(

        query(

            vipNumbersRef,

            orderBy("createdAt", "desc")

        )

    );

    let index = 1;

    snapshot.forEach((docItem) => {

        const data = docItem.data();

        vipTableBody.innerHTML += `

<tr>

<td>${index++}</td>

<td>${data.number}</td>

<td>₹${Number(data.price).toLocaleString()}</td>

<td>${data.category}</td>

<td>${data.operator}</td>

<td>

<span class="status ${String(data.status).toLowerCase()}">

${data.status}

</span>

</td>

<td>${data.views || 0}</td>

<td>

<button
class="action-btn edit"
onclick="editVip('${docItem.id}')">

Edit

</button>

<button
class="action-btn delete"
onclick="deleteVip('${docItem.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}
// =======================================
// Load Orders
// =======================================

async function loadOrders() {

    ordersTableBody.innerHTML = "";

    const snapshot = await getDocs(

        query(

            ordersRef,

            orderBy("createdAt", "desc")

        )

    );

    snapshot.forEach((docItem) => {

        const data = docItem.data();

        const date = data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleDateString()
            : "-";

        ordersTableBody.innerHTML += `

<tr>

<td>${docItem.id}</td>

<td>${data.customerName || "-"}</td>

<td>${data.mobile || "-"}</td>

<td>${data.vipNumber || "-"}</td>

<td>₹${Number(data.price || 0).toLocaleString()}</td>

<td>${data.paymentStatus || "Pending"}</td>

<td>${data.status || "Pending"}</td>

<td>${date}</td>

<td>

<button
class="action-btn edit"
onclick="updateOrderStatus('${docItem.id}')">

Update

</button>

</td>

</tr>

`;

    });

}
// =======================================
// Load Customers
// =======================================

async function loadCustomers() {

    customersTableBody.innerHTML = "";

    const snapshot = await getDocs(

        query(

            customersRef,

            orderBy("createdAt", "desc")

        )

    );

    snapshot.forEach((docItem) => {

        const data = docItem.data();

        customersTableBody.innerHTML += `

<tr>

<td>${data.name || "-"}</td>

<td>${data.mobile || "-"}</td>

<td>${data.whatsapp || "-"}</td>

<td>${data.city || "-"}</td>

<td>${data.totalOrders || 0}</td>

<td>₹${Number(data.totalSpent || 0).toLocaleString()}</td>

<td>${data.status || "Active"}</td>

<td>

<button
class="action-btn edit"
onclick="editCustomer('${docItem.id}')">

Edit

</button>

<button
class="action-btn delete"
onclick="deleteCustomer('${docItem.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}
// =======================================
// Load Visitors
// =======================================

async function loadVisitors() {

    visitorTableBody.innerHTML = "";

    const snapshot = await getDocs(

        query(

            visitorsRef,

            orderBy("createdAt", "desc")

        )

    );

    document.getElementById("todayVisitCard").textContent =
        snapshot.size;

    document.getElementById("weekVisitCard").textContent =
        snapshot.size;

    document.getElementById("monthVisitCard").textContent =
        snapshot.size;

    document.getElementById("allVisitCard").textContent =
        snapshot.size;

    snapshot.forEach((docItem) => {

        const data = docItem.data();

        const date = data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleString()
            : "-";

        visitorTableBody.innerHTML += `

<tr>

<td>${date}</td>

<td>${data.device || "-"}</td>

<td>${data.browser || "-"}</td>

<td>${data.country || "-"}</td>

<td>${data.city || "-"}</td>

<td>${data.ip || "-"}</td>

</tr>

`;

    });

}
// =======================================
// Load Notifications
// =======================================

async function loadNotifications() {

    notificationList.innerHTML = "";

    onSnapshot(

        query(

            notificationsRef,

            orderBy("createdAt","desc")

        ),

        (snapshot)=>{

            notificationList.innerHTML="";

            snapshot.forEach((docItem)=>{

                const data = docItem.data();

                const date = data.createdAt?.toDate
                ? data.createdAt.toDate().toLocaleString()
                : "-";

                notificationList.innerHTML += `

<div class="notification-item">

<div class="notification-title">

${data.title || "Notification"}

</div>

<div class="notification-message">

${data.message || ""}

</div>

<small>

${date}

</small>

</div>

`;

            });

        }

    );

}
// =======================================
// Auto Logout (10 Minutes)
// =======================================

let logoutTimer;

function resetLogoutTimer() {

    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(async () => {

        try {

            await signOut(auth);

        } catch (e) {

            console.error(e);

        }

        localStorage.clear();

        sessionStorage.clear();

        alert("Session Expired!\nPlease Login Again.");

        window.location.replace("login.html");

    }, 10 * 60 * 1000);

}

[
"click",
"mousemove",
"keydown",
"touchstart",
"scroll"

].forEach((eventName)=>{

    document.addEventListener(

        eventName,

        resetLogoutTimer

    );

});

resetLogoutTimer();
// =======================================
// Logout Button
// =======================================

logoutBtn.addEventListener("click", async () => {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    loadingOverlay.classList.add("active");

    try {

        await signOut(auth);

    } catch (error) {

        console.error(error);

    }

    localStorage.clear();

    sessionStorage.clear();

    window.location.replace("login.html");

});

// =======================================
// Toast Message
// =======================================

function showToast(message, type = "success") {

    toast.className = "toast";

    if (type !== "success") {

        toast.classList.add(type);

    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
// =======================================
// VIP Number Actions
// =======================================

window.editVip = async function(id){

const snapshot=await getDocs(vipNumbersRef);

snapshot.forEach((docItem)=>{

if(docItem.id===id){

const data=docItem.data();

document.getElementById("vipDocId").value=id;

document.getElementById("vipNumber").value=data.number;

document.getElementById("vipPrice").value=data.price;

document.getElementById("vipCategory").value=data.category;

document.getElementById("vipOperator").value=data.operator;

document.getElementById("vipStatus").value=data.status;

document.getElementById("vipFeatured").value=String(data.featured);

document.getElementById("vipModalTitle").innerText="Edit VIP Number";

document.getElementById("vipModal").classList.add("active");

}

});

};

window.deleteVip = async function(id) {

    if (!confirm("Delete this VIP Number?")) return;

    loadingOverlay.classList.add("active");

    try {

        await deleteDoc(

            doc(db, "vipNumbers", id)

        );

        showToast("VIP Number Deleted");

        loadVipNumbers();

        loadDashboard();

    } catch (error) {

        console.error(error);

        showToast("Delete Failed", "error");

    }

    loadingOverlay.classList.remove("active");

};

window.updateOrderStatus = async function(id) {

    await updateDoc(

        doc(db, "orders", id),

        {

            status: "Completed",

            updatedAt: serverTimestamp()

        }

    );

    showToast("Order Updated");

    loadOrders();

};

window.editCustomer = function(id){

    console.log("Edit Customer:", id);

    showToast("Customer Edit");

};

window.deleteCustomer = async function(id){

    if(!confirm("Delete Customer?")) return;

    await deleteDoc(

        doc(db,"customers",id)

    );

    showToast("Customer Deleted");

    loadCustomers();

};
// =======================================
// Settings Form
// =======================================

const settingsForm = document.getElementById("settingsForm");

if (settingsForm) {

settingsForm.addEventListener("submit", async (e) => {

e.preventDefault();

loadingOverlay.classList.add("active");

try{

await updateDoc(

doc(db,"settings","website"),

{

siteName:document.getElementById("siteName").value,

whatsapp:document.getElementById("whatsappNumber").value,

email:document.getElementById("siteEmail").value,

instagram:document.getElementById("instagramLink").value,

facebook:document.getElementById("facebookLink").value,

youtube:document.getElementById("youtubeLink").value,

address:document.getElementById("officeAddress").value,

theme:document.getElementById("websiteTheme").value,

maintenance:document.getElementById("maintenanceMode").value,

updatedAt:serverTimestamp()

}

);

showToast("Settings Saved");

}catch(error){

console.error(error);

showToast("Save Failed","error");

}

loadingOverlay.classList.remove("active");

});

}

// =======================================
// Scroll To Top
// =======================================

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

});

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
// =======================================
// Search & Filter
// =======================================

const searchVip = document.getElementById("searchVip");

const filterStatus = document.getElementById("filterStatus");

const filterCategory = document.getElementById("filterCategory");

if(searchVip){

searchVip.addEventListener("input",loadVipNumbers);

}

if(filterStatus){

filterStatus.addEventListener("change",loadVipNumbers);

}

if(filterCategory){

filterCategory.addEventListener("change",loadVipNumbers);

}
const vipForm = document.getElementById("vipForm");

vipForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("vipDocId").value;

    const data = {
        number: document.getElementById("vipNumber").value,
        price: Number(document.getElementById("vipPrice").value),
        category: document.getElementById("vipCategory").value,
        operator: document.getElementById("vipOperator").value,
        status: document.getElementById("vipStatus").value,
        featured: document.getElementById("vipFeatured").value === "true",
        updatedAt: serverTimestamp()
    };

    if (id) {
        await updateDoc(doc(db, "vipNumbers", id), data);
        showToast("VIP Number Updated");
    } else {
        data.createdAt = serverTimestamp();
        await addDoc(vipNumbersRef, data);
        showToast("VIP Number Added");
    }

    document.getElementById("vipModal").classList.remove("active");
    vipForm.reset();
    document.getElementById("vipDocId").value = "";

    loadVipNumbers();
    loadDashboard();
});
// =======================================
// VIP Modal Controls
// =======================================

const addVipBtn = document.getElementById("addVipBtn");
const vipModal = document.getElementById("vipModal");
const closeVipModal = document.getElementById("closeVipModal");
const cancelVipBtn = document.getElementById("cancelVipBtn");

addVipBtn.addEventListener("click", () => {

    document.getElementById("vipForm").reset();

    document.getElementById("vipDocId").value = "";

    document.getElementById("vipModalTitle").innerText = "Add VIP Number";

    vipModal.classList.add("active");

});

closeVipModal.addEventListener("click", () => {

    vipModal.classList.remove("active");

});

cancelVipBtn.addEventListener("click", () => {

    vipModal.classList.remove("active");

});

window.addEventListener("click", (e) => {

    if (e.target === vipModal) {

        vipModal.classList.remove("active");

    }

});
// =======================================
// Real Time Dashboard
// =======================================

onSnapshot(vipNumbersRef,()=>{

loadDashboard();

loadVipNumbers();

});

onSnapshot(ordersRef,()=>{

loadDashboard();

loadOrders();

});

onSnapshot(customersRef,()=>{

loadDashboard();

loadCustomers();

});

onSnapshot(visitorsRef,()=>{

loadDashboard();

loadVisitors();

});

// =======================================
// Notification Sound
// =======================================

function playNotificationSound(){

const audio=new Audio("notification.mp3");

audio.volume=0.6;

audio.play().catch(()=>{});

}
// =======================================
// Final Initialization
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("VIP Number Bazar V5 Professional");

    console.log("Admin Panel Loaded");

    resetLogoutTimer();

    loadDashboard();

    loadVipNumbers();

    loadOrders();

    loadCustomers();

    loadVisitors();

    loadNotifications();

});

// =======================================
// Window Functions
// =======================================

window.showToast = showToast;

window.loadDashboard = loadDashboard;

window.loadVipNumbers = loadVipNumbers;

window.loadOrders = loadOrders;

window.loadCustomers = loadCustomers;

window.loadVisitors = loadVisitors;

window.loadNotifications = loadNotifications;

// =======================================
// Version
// =======================================

const APP_NAME = "VIP Number Bazar";

const APP_VERSION = "V5 Professional";

console.log(APP_NAME);

console.log(APP_VERSION);

console.log("Admin Module Ready");

// =======================================
// End Of File
// =======================================

export {};
