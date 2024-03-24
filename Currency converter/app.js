const Base_ULR ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

/*
GET https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies/uah/inr.json 404 (Not Found)
*/

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");

for(let select of dropdowns){
  for(code in countryList){
   let newOption = document.createElement("option");
     newOption.innerText = code;
     newOption.value = code;
     if(select.name==="from" && code === "USD"){
      newOption.selected = "selected";
     }else if(select.name==="to" && code === "INR"){
       newOption.selected = "selected";
      }
     select.append(newOption);
  }
  select.addEventListener("change", (evt)=>{
   updateflag(evt.target);
  });
 }

 const updateflag= (element)=>{
   let code = element.value;
   let countrycode = countryList[code];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newsrc;
 };

 btn.addEventListener("click", async(evt)=>{
   evt.preventDefault();
   let amt=document.querySelector(".amount input");
   let amtval = amt.value;
   if(amtval === "" || amtval < 0){
    amtval = 1;
    amt.value = "1";
   }
   
   // console.log(fromcurr.value, tocurr.value);
   const URl = `${Base_ULR}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

   let response = await fetch(URl);

   let data = await response.json();
   let rate = data[tocurr.value.toLowerCase()];

   let findAmount = amtval * rate;
   MessageChannel.innerText = `${amtval}${fromcurr} = ${findAmount}${tocurr}`;
   console.log(data);
 });
