import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const tbody = document.getElementById("visitorTable");

async function loadVisitors() {

  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "visitors"));

  snapshot.forEach((item) => {

    const data = item.data();

    tbody.innerHTML += `
      <tr>
        <td>${data.name || "-"}</td>
        <td>${data.phone || "-"}</td>
        <td>${data.date || "-"}</td>
        <td>${data.time || "-"}</td>
        <td>
          <button onclick="deleteVisitor('${item.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });

}

window.deleteVisitor = async (id) => {

  if (confirm("Delete Visitor?")) {

    await deleteDoc(doc(db, "visitors", id));

    loadVisitors();

  }

};

document.getElementById("searchVisitor").addEventListener("keyup", function () {

  const value = this.value.toLowerCase();

  document.querySelectorAll("#visitorTable tr").forEach((row) => {

    row.style.display =
      row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";

  });

});

loadVisitors();
