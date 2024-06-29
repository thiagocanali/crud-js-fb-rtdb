import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzwuDE9airu_A8lLSN_WqO4hOhTKGfAzg",
    authDomain: "fir-v10-9e327.firebaseapp.com",
    databaseURL: "https://fir-v10-9e327-default-rtdb.firebaseio.com",
    projectId: "fir-v10-9e327",
    storageBucket: "fir-v10-9e327.appspot.com",
    messagingSenderId: "512604124215",
    appId: "1:512604124215:web:ca38d2dea29ba527cebbb2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

let FnameInp = document.getElementById('FnameInp');
let LnameInp = document.getElementById('LnameInp');
let DeptInp = document.getElementById('DeptInp');
let SwimInp = document.getElementById('SwimInp');
let CnicInp = document.getElementById('CnicInp');

let AddBtn = document.getElementById('AddBtn');
let RetBtn = document.getElementById('RetBtn');
let UpdBtn = document.getElementById('UpdBtn');
let DelBtn = document.getElementById('DelBtn');

function AddData() {
    set(ref(db, 'EmployeeSet/' + CnicInp.value), {
        nameofemployee: { firstname: FnameInp.value, lastname: LnameInp.value },
        department: DeptInp.value,
        canswim: (SwimInp.value == "yes"),
        cnic: Number(CnicInp.value)
    }).then(() => {
        alert("Data Added Successfully");
    })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
}

function RetData() {
    get(ref(db, 'EmployeeSet/' + CnicInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            FnameInp.value = snapshot.val().nameofemployee.firstname;
            LnameInp.value = snapshot.val().nameofemployee.lastname;
            DeptInp.value = snapshot.val().department;
            SwimInp.value = (snapshot.val().canswim) ? "yes" : "no";
        } else {
            alert("Employee does not exist");
        }
    })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
}

function UpdateData() {
    update(ref(db, 'EmployeeSet/' + CnicInp.value), {
        nameofemployee: { firstname: FnameInp.value, lastname: LnameInp.value },
        department: DeptInp.value,
        canswim: (SwimInp.value == "yes"),
        cnic: Number(CnicInp.value)
    }).then(() => {
        alert("Data Updated Successfully");
    })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
}

function DeleteData() {
    remove(ref(db, 'EmployeeSet/' + CnicInp.value))
        .then(() => {
            alert("Data Deleted Successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.error(error);
        });
}

AddBtn.addEventListener('click', AddData);
RetBtn.addEventListener('click', RetData);
UpdBtn.addEventListener('click', UpdateData);
DelBtn.addEventListener('click', DeleteData);
