import { db, auth } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// લોગિન ચેક (જો લોગિન ન હોય તો Login પેજ પર મોકલો)
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// નંબર ઉમેરવાનું ફંક્શન
document.getElementById('add-btn').addEventListener('click', async () => {
    const number = document.getElementById('num').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    try {
        await addDoc(collection(db, "vipNumbers"), {
            number: number,
            price: Number(price),
            category: category,
            status: "Available",
            createdAt: serverTimestamp()
        });
        alert("નંબર ઉમેરાઈ ગયો!");
    } catch (e) {
        alert("ભૂલ: " + e.message);
    }
});
