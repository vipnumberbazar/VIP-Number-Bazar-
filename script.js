// ==========================================
// VIP Number Bazar V4 Professional
// script.js - Part 1
// ==========================================

import {
    vipNumbersRef,
    getDocs,
    addDoc,
    collection,
    serverTimestamp,
    db,
    ordersRef,
    customersRef
} from "./firebase.js";

// =======================
// Elements
// =======================

const loader = document.getElementById("loader");

const numbersGrid = document.getElementById("numbersGrid");

const searchInput = document.getElementById("searchInput");

const totalNumbers = document.getElementById("totalNumbers");

const totalOrders = document.getElementById("totalOrders");

const totalRevenue = document.getElementById("totalRevenue");

const totalCustomers = document.getElementById("totalCustomers");

const bookingModal = document.getElementById("bookingModal");

const closeModal = document.getElementById("closeModal");

const bookingForm = document.getElementById("bookingForm");

const customerName = document.getElementById("customerName");

const customerPhone = document.getElementById("customerPhone");

const selectedNumber = document.getElementById("selectedNumber");

const selectedPrice = document.getElementById("selectedPrice");

const toast = document.getElementById("toast");

let vipList = [];

// =======================
// Initialize
// =======================

window.addEventListener("load", () => {

    loadVipNumbers();

});

// =======================
// Toast
// =======================

function showToast(message){

    toast.innerHTML = message;

    toast.style.display = "block";

    setTimeout(()=>{

        toast.style.display = "none";

    },2500);

}

// =======================
// Load VIP Numbers
// =======================

async function loadVipNumbers(){

    loader.style.display="flex";

    numbersGrid.innerHTML="";

    vipList=[];

    const snapshot=await getDocs(vipNumbersRef);

    let revenue=0;

    snapshot.forEach((doc)=>{

        const data=doc.data();

        vipList.push({

            id:doc.id,

            ...data

        });

        if(data.status==="Sold"){

            revenue+=Number(data.price);

        }

    });

    totalNumbers.innerHTML=vipList.length;

    totalRevenue.innerHTML="₹"+revenue;

    renderCards(vipList);

    loader.style.display="none";

}
// =======================
// Render VIP Cards
// =======================

function renderCards(list){

    numbersGrid.innerHTML="";

    if(list.length===0){

        numbersGrid.innerHTML=`
        <div class="empty-state">
            <h2>No VIP Numbers Found</h2>
        </div>
        `;
        return;
    }

    list.forEach((item)=>{

        const card=document.createElement("div");

        card.className="vip-card";

        card.innerHTML=`

        <div class="vip-number">

            ${item.number}

        </div>

        <div class="vip-price">

            ₹${item.price}

        </div>

        <span class="vip-status ${item.status.toLowerCase()}">

            ${item.status}

        </span>

        <button class="book-btn">

            Book Now

        </button>

        `;

        const btn=card.querySelector(".book-btn");

        if(item.status==="Sold"){

            btn.disabled=true;

            btn.innerHTML="Sold";

        }else{

            btn.addEventListener("click",()=>{

                selectedNumber.value=item.number;

                selectedPrice.value="₹"+item.price;

                bookingModal.style.display="flex";

            });

        }

        numbersGrid.appendChild(card);

    });

}

// =======================
// Close Modal
// =======================

closeModal.addEventListener("click",()=>{

    bookingModal.style.display="none";

});

window.addEventListener("click",(e)=>{

    if(e.target===bookingModal){

        bookingModal.style.display="none";

    }

});

// =======================
// Live Search
// =======================

searchInput.addEventListener("keyup",()=>{

    const keyword=searchInput.value.toLowerCase();

    const filtered=vipList.filter(item=>{

        return item.number.toLowerCase().includes(keyword);

    });

    renderCards(filtered);

});
// =======================
// WhatsApp Booking
// =======================

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        // Save Customer

        await addDoc(customersRef, {

            name: customerName.value.trim(),

            phone: customerPhone.value.trim(),

            createdAt: new Date()

        });

        // Save Order

        await addDoc(ordersRef, {

            customerName: customerName.value.trim(),

            customerPhone: customerPhone.value.trim(),

            vipNumber: selectedNumber.value,

            price: selectedPrice.value.replace("₹", ""),

            status: "Pending",

            createdAt: new Date()

        });

        showToast("Booking Successful");

        bookingModal.style.display = "none";

        bookingForm.reset();

        totalOrders.innerHTML = Number(totalOrders.innerHTML) + 1;

        totalCustomers.innerHTML = Number(totalCustomers.innerHTML) + 1;

        const message =
`Hello VIP Number Bazar,

I want to book this VIP Number.

Number : ${selectedNumber.value}
Price : ${selectedPrice.value}

Name : ${customerName.value}
Mobile : ${customerPhone.value}`;

        window.open(

            "https://wa.me/919999999999?text=" +

            encodeURIComponent(message),

            "_blank"

        );

    }

    catch(err){

        alert(err.message);

    }

});

// =======================
// Dashboard Counts
// =======================

async function loadCounts(){

    const orderSnap = await getDocs(ordersRef);

    const customerSnap = await getDocs(customersRef);

    totalOrders.innerHTML = orderSnap.size;

    totalCustomers.innerHTML = customerSnap.size;

}

loadCounts();
window.addEventListener("load", async () => {
  try {
    await addDoc(collection(db, "visitors"), {
      time: serverTimestamp(),
      userAgent: navigator.userAgent
    });
  } catch (e) {
    console.log(e);
  }
});
