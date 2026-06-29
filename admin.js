const searchInput = document.getElementById("searchInput");
const cards = document.getElementById("numberContainer");

searchInput.addEventListener("keyup", function () {

  const value = this.value.toLowerCase();

  const allCards = document.querySelectorAll(".vip-card");

  allCards.forEach(card => {

    const number = card.querySelector(".number").innerText.toLowerCase();

    if (number.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});

document.querySelectorAll(".whatsappBtn").forEach(btn => {

  btn.addEventListener("click", () => {

    window.open(
      "https://wa.me/916354312829?text=Hello, I want to book a VIP Number",
      "_blank"
    );

  });

});

document.querySelectorAll(".buyBtn").forEach(btn => {

  btn.addEventListener("click", () => {

    alert("Booking System Coming Soon");

  });

});
// Operator Filter

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

document.querySelector(".filter.active")?.classList.remove("active");

button.classList.add("active");

const operator = button.innerText.toLowerCase();

document.querySelectorAll(".vip-card").forEach(card => {

const cardOperator = card.querySelector(".operator").innerText.toLowerCase();

if(operator==="all"){

card.style.display="block";

}else{

card.style.display =
cardOperator===operator ? "block":"none";

}

});

});

});

// Book Now

document.querySelectorAll(".buyBtn").forEach(btn=>{

btn.addEventListener("click",()=>{

window.open(
"https://wa.me/916354312829?text=I want to book this VIP Number",
"_blank"
);

});

});

// Auto Year

const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML=
`© ${new Date().getFullYear()} VIP Number Bazar. All Rights Reserved.`;

}
