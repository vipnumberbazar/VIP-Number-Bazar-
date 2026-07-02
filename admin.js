import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
document.getElementById('add-btn').addEventListener('click', async () => {
    await addDoc(collection(db, "vipNumbers"), {
        number: document.getElementById('num').value,
        price: Number(document.getElementById('price').value)
    });
    alert("નંબર ઉમેરાઈ ગયો!");
});
