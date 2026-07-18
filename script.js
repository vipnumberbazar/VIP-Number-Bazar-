/*==================================================
VIP NUMBER BAZAR
script.js
Part 1 / 8
==================================================*/

"use strict";

/*==================================================
DOM ELEMENTS
==================================================*/

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const vipList = document.getElementById("vipList");

const detailsModal = document.getElementById("detailsModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const loader = document.getElementById("loader");

const backToTop = document.getElementById("backToTop");

/*==================================================
GLOBAL VARIABLES
==================================================*/

let vipNumbers = [];

let filteredNumbers = [];

let selectedNumber = null;

/*==================================================
HELPER FUNCTIONS
==================================================*/

function showLoader(){

if(loader){

loader.style.display="flex";

}

}

function hideLoader(){

if(loader){

loader.style.display="none";

}

}

function showModal(){

if(detailsModal){

detailsModal.classList.add("active");

}

}

function hideModal(){

if(detailsModal){

detailsModal.classList.remove("active");

}

}

function formatPrice(price){

return "₹" + Number(price).toLocaleString("en-IN");

}

function clearVipCards(){

if(vipList){

vipList.innerHTML="";

}

}

/*==================================================
INITIAL LOADER
==================================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

hideLoader();

},800);

});
/*==================================================
SEARCH FUNCTIONALITY
==================================================*/

function filterVipNumbers(keyword){

if(!keyword){

filteredNumbers=[...vipNumbers];

renderVipCards(filteredNumbers);

return;

}

keyword=keyword.toString().trim().toLowerCase();

filteredNumbers=vipNumbers.filter(item=>{

const number=(item.number||"").toString().toLowerCase();

const operator=(item.operator||"").toString().toLowerCase();

const category=(item.category||"").toString().toLowerCase();

const price=(item.price||"").toString();

return(

number.includes(keyword) ||

operator.includes(keyword) ||

category.includes(keyword) ||

price.includes(keyword)

);

});

renderVipCards(filteredNumbers);

}

/*==================================================
SEARCH EVENTS
==================================================*/

if(searchBtn){

searchBtn.addEventListener("click",()=>{

filterVipNumbers(searchInput.value);

});

}

if(searchInput){

searchInput.addEventListener("keyup",(e)=>{

filterVipNumbers(e.target.value);

});

searchInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

filterVipNumbers(searchInput.value);

}

});

}

/*==================================================
NO DATA MESSAGE
==================================================*/

function showNoData(){

vipList.innerHTML=`

<div class="no-data">

<h2>No VIP Number Found</h2>

<p>Please try another search.</p>

</div>

`;

}
/*==================================================
RENDER VIP CARDS
==================================================*/

function renderVipCards(data){

if(!vipList) return;

clearVipCards();

if(!data || data.length===0){

showNoData();

return;

}

data.forEach((item,index)=>{

const card=document.createElement("div");

card.className="vip-card";

card.innerHTML=`

<span class="badge">

${item.featured ? "Featured" : (item.category || "VIP")}

</span>

<h2>${item.number}</h2>

<p>${item.operator}</p>

<h3>${formatPrice(item.price)}</h3>

<div class="card-buttons">

<button
class="details-btn"
data-index="${index}">

Details

</button>

<a
class="buy-btn"
target="_blank"
href="https://wa.me/918070424242?text=I%20want%20to%20buy%20VIP%20Number%20${item.number}">

Buy Now

</a>

</div>

`;

vipList.appendChild(card);

});

bindDetailsButtons();

}

/*==================================================
INITIAL RENDER
==================================================*/

function loadVipCards(){

filteredNumbers=[...vipNumbers];

renderVipCards(filteredNumbers);

}
/*==================================================
DETAILS MODAL
==================================================*/

function bindDetailsButtons(){

const buttons=document.querySelectorAll(".details-btn");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const index=button.dataset.index;

selectedNumber=filteredNumbers[index];

openDetailsModal(selectedNumber);

});

});

}

function openDetailsModal(item){

if(!item) return;

modalBody.innerHTML=`

<h2>${item.number}</h2>

<p><strong>Operator :</strong> ${item.operator}</p>

<p><strong>Category :</strong> ${item.category}</p>

<p><strong>Price :</strong> ${formatPrice(item.price)}</p>

<p><strong>Status :</strong> ${item.status || "Available"}</p>

<p><strong>Description :</strong></p>

<p>

${item.description || "Premium VIP Mobile Number available for instant booking."}

</p>

<a
href="https://wa.me/918070424242?text=I want to buy VIP Number ${item.number}"
target="_blank"
class="gold-btn"
style="margin-top:20px;display:inline-flex;">

Book on WhatsApp

</a>

`;

showModal();

}

/*==================================================
MODAL EVENTS
==================================================*/

if(closeModal){

closeModal.addEventListener("click",hideModal);

}

window.addEventListener("click",(e)=>{

if(e.target===detailsModal){

hideModal();

}

});

window.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

hideModal();

}

});
/*==================================================
BACK TO TOP BUTTON
==================================================*/

window.addEventListener("scroll",()=>{

const scrollTop=window.pageYOffset || document.documentElement.scrollTop;

if(scrollTop>400){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});

if(backToTop){

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*==================================================
SMOOTH NAVIGATION
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

const target=document.querySelector(link.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

/*==================================================
HEADER SHADOW
==================================================*/

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.boxShadow="0 10px 25px rgba(0,0,0,.35)";

}else{

header.style.boxShadow="none";

}

});
/*==================================================
CATEGORY FILTER
==================================================*/

const categoryCards=document.querySelectorAll(".category-card");

categoryCards.forEach(card=>{

card.addEventListener("click",()=>{

const category=card.textContent.trim().toLowerCase();

if(category==="all numbers"){

filteredNumbers=[...vipNumbers];

renderVipCards(filteredNumbers);

return;

}

filteredNumbers=vipNumbers.filter(item=>{

return(item.category||"").toLowerCase()===category;

});

renderVipCards(filteredNumbers);

});

});

/*==================================================
FEATURED FILTER
==================================================*/

function showFeaturedNumbers(){

filteredNumbers=vipNumbers.filter(item=>item.featured===true);

renderVipCards(filteredNumbers);

}

/*==================================================
AVAILABLE FILTER
==================================================*/

function showAvailableNumbers(){

filteredNumbers=vipNumbers.filter(item=>{

return(item.status||"Available")==="Available";

});

renderVipCards(filteredNumbers);

}

/*==================================================
PRICE SORT
==================================================*/

function sortPriceLowToHigh(){

filteredNumbers.sort((a,b)=>Number(a.price)-Number(b.price));

renderVipCards(filteredNumbers);

}

function sortPriceHighToLow(){

filteredNumbers.sort((a,b)=>Number(b.price)-Number(a.price));

renderVipCards(filteredNumbers);

}
/*==================================================
UTILITY FUNCTIONS
==================================================*/

function getVipByNumber(number){

return vipNumbers.find(item=>item.number===number);

}

function refreshVipList(){

filteredNumbers=[...vipNumbers];

renderVipCards(filteredNumbers);

}

function resetSearch(){

if(searchInput){

searchInput.value="";

}

refreshVipList();

}

/*==================================================
LIVE SEARCH
==================================================*/

if(searchInput){

searchInput.addEventListener("input",(e)=>{

const keyword=e.target.value.trim().toLowerCase();

if(keyword===""){

refreshVipList();

return;

}

filterVipNumbers(keyword);

});

}

/*==================================================
COPY NUMBER
==================================================*/

function copyVipNumber(number){

navigator.clipboard.writeText(number)

.then(()=>{

alert("VIP Number Copied Successfully");

})

.catch(()=>{

alert("Unable to Copy Number");

});

}

/*==================================================
CARD EVENTS
==================================================*/

document.addEventListener("click",(e)=>{

const copyBtn=e.target.closest(".copy-number");

if(copyBtn){

const number=copyBtn.dataset.number;

copyVipNumber(number);

}

});

/*==================================================
WINDOW ONLINE / OFFLINE
==================================================*/

window.addEventListener("offline",()=>{

alert("No Internet Connection");

});

window.addEventListener("online",()=>{

console.log("Internet Connected");

});

/*==================================================
PAGE READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

showLoader();

setTimeout(()=>{

hideLoader();

},500);

});


/*==================================================
INITIALIZE APP
==================================================*/

async function initializeApp(){

try{

showLoader();

if(typeof loadVipNumbers==="function"){

await loadVipNumbers();

}else{

loadVipCards();

}

}catch(error){

console.error(error);

vipList.innerHTML=`

<div class="no-data">

<h2>Something Went Wrong</h2>

<p>Please refresh the page.</p>

</div>

`;

}finally{

hideLoader();

}

}

/*==================================================
WINDOW EVENTS
==================================================*/

window.addEventListener("load",()=>{

initializeApp();

});

window.addEventListener("focus",()=>{

if(searchInput && searchInput.value===""){

refreshVipList();

}

});

/*==================================================
GLOBAL FUNCTIONS
==================================================*/

window.showFeaturedNumbers=showFeaturedNumbers;
window.showAvailableNumbers=showAvailableNumbers;
window.sortPriceLowToHigh=sortPriceLowToHigh;
window.sortPriceHighToLow=sortPriceHighToLow;
window.resetSearch=resetSearch;

/*==================================================
END OF FILE
==================================================*/



