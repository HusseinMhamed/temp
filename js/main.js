import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href = "login.html";
} else {
    const userRef = ref(db, `users/${currentUser}/data`);
    get(userRef)
        .then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                localStorage.setItem("tableData", JSON.stringify(userData));

                loadTable();
            } else {
                alert("لا توجد بيانات للمستخدم الحالي");
            }
        })
        .catch(error => {
            console.error("خطأ أثناء تحميل بيانات المستخدم:", error);
        });
}

function loadTable() {
    const data = JSON.parse(localStorage.getItem("tableData")) || [];
    const table = document.getElementById("table");

    data.forEach(rowData => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rowData.name}</td>
            <td>${rowData.specialty}</td>
            <td>${rowData.image}</td>
            <td>${rowData.published}</td>
        `;
        table.appendChild(row);
    });
}
