let price = 3.26;
const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const priceDiv = document.getElementById("price");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const availiableChangeDiv = document.getElementById("cid");
const reversedCid = cid.reverse();
const moneyValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01].map(el => el * 100)

priceDiv.innerHTML = `<h3>Total: <strong> $${price}</strong></h3>`

const cashRegister = () => {
  if (parseFloat(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    
  } else if (parseFloat(cash.value) === price) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
  } else {
    let currentChangeAvailable = reversedCid.reduce((arr, item) => arr + item[1], 0) * 100;
    let change = (parseFloat(cash.value) - price) * 100;
    const results = []
    const copyReversedCid = reversedCid.map(el => el[1])
    changeDue.innerHTML = "<p>Status: OPEN</p>";
    for (let i =0; i < reversedCid.length; i++) {
      if (change >= moneyValues[i] && change > 0) {
        const [value, total] = reversedCid[i];
        const possibleChange = Math.min(total * 100, change);
        const count = Math.floor(possibleChange / moneyValues[i]);
        const amountDue = count * moneyValues[i];
        change -= amountDue;
        currentChangeAvailable -= amountDue;
        if (count > 0) {
          results.push([value, amountDue / 100]);
          reversedCid[i][1] = Math.round((total - (amountDue / 100)) * 100) / 100
        }
      } 
    }
    if (currentChangeAvailable === 0) {
    changeDue.innerHTML = "<p>Status: CLOSED</p>"
  }
  
    changeDue.innerHTML += ` ${(results.map(el => `<p>${el.map(i => Number(i)? `$${i}`:i).join(": ")}</p>`)).join("")}`;

    if (change > 0) {
      changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS` ;
      for (let i = 0; i < reversedCid.length; i++) {
        reversedCid[i][1] = copyReversedCid[i] 
      }
    }
    availiableChangeDiv.innerHTML = `<h3>Change in drawer:</h3>${reversedCid.map(el => `<p>${el.map(i => Number(i)?`$${i}`: i).join(": ")}</p>`).join("")}`
  
  }
}

purchaseBtn.addEventListener("click", ()=>{
  if (!Number(cash.value)) {
    alert("Enter a number");
  } else {
    cashRegister();
    cash.value = "";
  }
})

