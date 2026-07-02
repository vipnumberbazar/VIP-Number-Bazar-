import { db } from "./firebase.js";

import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadNumbers() {
    const list = document.getElementById('number-list');
    const querySnapshot = await getDocs(collection(db, "vipNumbers"));
    list.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const d = doc.data();
        list.innerHTML += `<div class="card"><h3>${d.number}</h3><p>કિંમત: ₹${d.price}</p><a href="https://wa.me/91XXXXXXXXXX?text=મારે ${d.number} નંબર જોઈએ છે" class="wa-btn">WhatsApp</a></div>`;
    });
}
loadNumbers();
