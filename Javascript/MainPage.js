/*-- Burger-collapse toggler --*/
function BurgerAnim(x, y) {
  x.classList.toggle("change");
  y.classList.toggle("change2");
}

function infoSetter () {
  const name = document.getElementById('name').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  
  localStorage.setItem("NAME", name);
  localStorage.setItem("LASTNAME", lastName);
  localStorage.setItem("EMAIL", email);
  localStorage.setItem("AGE", age);

  return;
}

const quote = document.querySelector("#quote"); // reference for paragraph with id "#quote" in html
const author = document.querySelector("#author"); // reference for <small> with id "#author" in html
const nextQuoteBtn = document.querySelector("#nextQuoteBtn"); // reference for button with id "##nextQuoteBtn" in html

//nextQuoteBtn.addEventListener("click", getQuote); // on click button we call function getQuote()

function getQuote(){ //function itself
  fetch("https://quotable.io/random"). // Request for data from API
  then(res=> res.json()). // we get json file
  then(data=> { // change data by innerHTML
    quote.innerHTML = `"${data.content}"`;
    author.innerHTML = data.author;
  })
}