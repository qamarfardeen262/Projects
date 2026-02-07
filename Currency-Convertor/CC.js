const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
import { countryList } from "./CC-export.js";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

async function convert() 
    {
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if (amtVal === "" || amtVal < "1")
{
    amtVal = 1;
    amount.value = "1";
}
        const res = await fetch(
            'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
        );
        const data = await res.json();

        const rateFrom = data.eur[toCurr.value.toLowerCase()];  
        const rateTo = data.eur[fromCurr.value.toLowerCase()];
        const exchangeAmount = ((rateFrom / rateTo) * amtVal).toFixed(2);
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${exchangeAmount} ${toCurr.value}`;
    }


for (let select of dropdown) 
{
    for (let currCode in countryList) 
    {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD")
        {
            newOption.selected = "selected";
        }
        else if (select.name == "to" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
   
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
});
}

const updateFlag = (element) =>
{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
convert();
});

window.addEventListener("load", () => {
    convert();
});



swapIcon.addEventListener("click", () => {
    swapIcon.classList.toggle("rotate");
  // Swap currency values
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  // Update flags
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Recalculate exchange
  convert();
});