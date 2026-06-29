import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",
  authDomain: "vipnumberbazar-73e51.firebaseapp.com",
  projectId: "vipnumberbazar-73e51",
  storageBucket: "vipnumberbazar-73e51.firebasestorage.app",
  messagingSenderId: "756745745147",
  appId: "1:756745745147:web:e8dcd216eda572c440f65e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const numbersRef = collection(db, "numbers");
let editId = null;

async function saveNumber() {

  const number = document.getElementById("number").value;
  const price = Number(document.getElementById("price").value);
  const status = document.getElementById("status").value;

  if (!number || !price) {
    alert("Number અને Price લખો");
    return;
  }

  if (editId) {

    await updateDoc(doc(db, "numbers", editId), {
      number: number,
      Price: price,
      status: status
    });

    editId = null;

  } else {

    await addDoc(numbersRef, {
      number: number,
      Price: price,
      status: status
    });

  }

  document.getElementById("number").value = "";
  document.getElementById("price").value = "";
  document.getElementById("status").value = "Available";

  loadNumbers();

}

document.getElementById("saveBtn").onclick = saveNumber;
async function loadNumbers() {

  const snapshot = await getDocs(numbersRef);

  let html = "";

  snapshot.forEach((d) => {

    const data = d.data();

    html += `
      <tr>
        <td>${data.number}</td>
        <td>₹${data.Price}</td>
        <td>${data.status}</td>

        <td>
          <button class="edit-btn"
            onclick="editNumber('${d.id}',
            '${data.number}',
            '${data.Price}',
            '${data.status}')">
            Edit
          </button>

          <button class="delete-btn"
            onclick="deleteNumber('${d.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;

  });

  document.getElementById("tableBody").innerHTML = html;

}

window.editNumber = function(id, number, price, status) {

  editId = id;

  document.getElementById("number").value = number;
  document.getElementById("price").value = price;
  document.getElementById("status").value = status;

};

window.deleteNumber = async function(id) {

  if(confirm("Delete this number?")){

    await deleteDoc(doc(db,"numbers",id));

    loadNumbers();

  }

};

loadNumbers();
window.changeStatus = async function(id, currentStatus) {

  const newStatus =
    currentStatus === "Available" ? "Sold" : "Available";

  await updateDoc(doc(db, "numbers", id), {
    status: newStatus
  });

  loadNumbers();
};

const searchBox = document.getElementById("search");

if (searchBox) {
  searchBox.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
      if (row.innerText.toLowerCase().includes(value)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

  });
}

setInterval(loadNumbers, 5000);
