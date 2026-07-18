/*==================================================
VIP NUMBER BAZAR
firebase.js
Part 1 / 8
==================================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
doc,
getDoc,
addDoc,
updateDoc,
deleteDoc,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

/*==================================================
FIREBASE CONFIG
==================================================*/

const firebaseConfig = {

apiKey: "AIzaSyAWD14Nf9l7HlFrPMsHijREOHoGrxeehok",

authDomain: "vipnumberbazar-73e51.firebaseapp.com",

projectId: "vipnumberbazar-73e51",

storageBucket: "vipnumberbazar-73e51.firebasestorage.app",

messagingSenderId: "756745745147",

appId: "1:756745745147:web:e8dcd216eda572c440f65e",

measurementId: "G-ZTB2EEZVQ1"

};

/*==================================================
INITIALIZE FIREBASE
==================================================*/

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

/*==================================================
COLLECTION
==================================================*/

const vipCollection = collection(db,"vip_numbers");
/*==================================================
LOAD VIP NUMBERS
==================================================*/

async function loadVipNumbers(){

try{

showLoader();

vipNumbers=[];

const q=query(

vipCollection,

orderBy("price","asc")

);

const snapshot=await getDocs(q);

snapshot.forEach(docSnap=>{

vipNumbers.push({

id:docSnap.id,

...docSnap.data()

});

});

filteredNumbers=[...vipNumbers];

renderVipCards(filteredNumbers);

}catch(error){

console.error("Load Error :",error);

vipList.innerHTML=`

<div class="no-data">

<h2>Unable to Load VIP Numbers</h2>

<p>Please try again later.</p>

</div>

`;

}finally{

hideLoader();

}

}

/*==================================================
GET SINGLE VIP NUMBER
==================================================*/

async function getVipNumber(id){

const documentRef=doc(db,"vip_numbers",id);

const snapshot=await getDoc(documentRef);

if(snapshot.exists()){

return{

id:snapshot.id,

...snapshot.data()

};

}

return null;

}
/*==================================================
ADD VIP NUMBER
==================================================*/

async function addVipNumber(data){

try{

showLoader();

const document=await addDoc(

vipCollection,

{

number:data.number,

operator:data.operator,

category:data.category,

price:Number(data.price),

status:data.status || "Available",

featured:data.featured || false,

owner:data.owner || "",

description:data.description || "",

createdAt:Date.now()

}

);

console.log("Added :",document.id);

await loadVipNumbers();

return true;

}catch(error){

console.error("Add Error :",error);

return false;

}finally{

hideLoader();

}

}

/*==================================================
UPDATE VIP NUMBER
==================================================*/

async function updateVipNumber(id,data){

try{

showLoader();

const documentRef=doc(db,"vip_numbers",id);

await updateDoc(documentRef,{

number:data.number,

operator:data.operator,

category:data.category,

price:Number(data.price),

status:data.status,

featured:data.featured,

owner:data.owner,

description:data.description,

updatedAt:Date.now()

});

await loadVipNumbers();

return true;

}catch(error){

console.error("Update Error :",error);

return false;

}finally{

hideLoader();

}

}
/*==================================================
DELETE VIP NUMBER
==================================================*/

async function deleteVipNumber(id){

try{

const confirmDelete=confirm(

"Are you sure you want to delete this VIP Number?"

);

if(!confirmDelete){

return false;

}

showLoader();

const documentRef=doc(db,"vip_numbers",id);

await deleteDoc(documentRef);

await loadVipNumbers();

return true;

}catch(error){

console.error("Delete Error :",error);

return false;

}finally{

hideLoader();

}

}

/*==================================================
SEARCH VIP NUMBER
==================================================*/

async function searchVipNumbers(keyword){

if(!keyword){

await loadVipNumbers();

return;

}

const value=keyword.toLowerCase().trim();

filteredNumbers=vipNumbers.filter(item=>{

return(

(item.number||"").toLowerCase().includes(value)||

(item.operator||"").toLowerCase().includes(value)||

(item.category||"").toLowerCase().includes(value)||

(item.owner||"").toLowerCase().includes(value)

);

});

renderVipCards(filteredNumbers);

}
/*==================================================
AUTHENTICATION
==================================================*/

async function loginAdmin(email,password){

try{

showLoader();

await signInWithEmailAndPassword(

auth,

email,

password

);

return true;

}catch(error){

console.error("Login Error :",error);

alert(error.message);

return false;

}finally{

hideLoader();

}

}

/*==================================================
LOGOUT
==================================================*/

async function logoutAdmin(){

try{

await signOut(auth);

window.location.href="../index.html";

}catch(error){

console.error("Logout Error :",error);

}

}

/*==================================================
AUTH STATE
==================================================*/

onAuthStateChanged(auth,(user)=>{

const isAdminPage=

window.location.pathname.includes("admin");

if(isAdminPage && !user){

window.location.href="login.html";

}

});

/*==================================================
OWNER FUNCTIONS
==================================================*/

function getOwnerList(){

const owners=[];

vipNumbers.forEach(item=>{

const owner=(item.owner||"Unknown").trim();

if(!owners.includes(owner)){

owners.push(owner);

}

});

owners.sort();

return owners;

}

function getOwnerNumbers(ownerName){

return vipNumbers.filter(item=>{

return(item.owner||"Unknown")===ownerName;

});

}

/*==================================================
DASHBOARD STATISTICS
==================================================*/

function getDashboardStats(){

const totalNumbers=vipNumbers.length;

const available=vipNumbers.filter(item=>

(item.status||"Available")==="Available"

).length;

const sold=vipNumbers.filter(item=>

(item.status||"Available")==="Sold"

).length;

const featured=vipNumbers.filter(item=>

item.featured===true

).length;

const totalValue=vipNumbers.reduce((sum,item)=>{

return sum+Number(item.price||0);

},0);

return{

totalNumbers,

available,

sold,

featured,

totalValue

};

}
/*==================================================
OWNER SUMMARY
==================================================*/

function getOwnerSummary(){

const summary={};

vipNumbers.forEach(item=>{

const owner=(item.owner||"Unknown").trim();

if(!summary[owner]){

summary[owner]={

count:0,

totalValue:0

};

}

summary[owner].count++;

summary[owner].totalValue+=Number(item.price||0);

});

return summary;

}

/*==================================================
CATEGORY SUMMARY
==================================================*/

function getCategorySummary(){

const summary={};

vipNumbers.forEach(item=>{

const category=(item.category||"Others").trim();

summary[category]=(summary[category]||0)+1;

});

return summary;

}

/*==================================================
OPERATOR SUMMARY
==================================================*/

function getOperatorSummary(){

const summary={};

vipNumbers.forEach(item=>{

const operator=(item.operator||"Unknown").trim();

summary[operator]=(summary[operator]||0)+1;

});

return summary;

}

/*==================================================
EXPORT FUNCTIONS
==================================================*/

window.db=db;

window.auth=auth;

window.vipCollection=vipCollection;

window.loadVipNumbers=loadVipNumbers;

window.getVipNumber=getVipNumber;

window.addVipNumber=addVipNumber;

window.updateVipNumber=updateVipNumber;

window.deleteVipNumber=deleteVipNumber;

window.searchVipNumbers=searchVipNumbers;

window.loginAdmin=loginAdmin;

window.logoutAdmin=logoutAdmin;

window.getDashboardStats=getDashboardStats;

window.getOwnerList=getOwnerList;

window.getOwnerNumbers=getOwnerNumbers;

window.getOwnerSummary=getOwnerSummary;

window.getCategorySummary=getCategorySummary;

window.getOperatorSummary=getOperatorSummary;


/*==================================================
INITIALIZE FIREBASE APP
==================================================*/

async function initializeFirebase(){

try{

await loadVipNumbers();

console.log("Firebase Connected Successfully");

}catch(error){

console.error("Firebase Initialization Error :",error);

}

}

/*==================================================
AUTO START
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initializeFirebase();

});

/*==================================================
GLOBAL VARIABLES
==================================================*/

window.vipNumbers=vipNumbers;

window.filteredNumbers=filteredNumbers;

/*==================================================
END OF FILE
==================================================*/

export{

db,

auth,

vipCollection,

loadVipNumbers,

getVipNumber,

addVipNumber,

updateVipNumber,

deleteVipNumber,

searchVipNumbers,

loginAdmin,

logoutAdmin,

getDashboardStats,

getOwnerList,

getOwnerNumbers,

getOwnerSummary,

getCategorySummary,

getOperatorSummary

};
