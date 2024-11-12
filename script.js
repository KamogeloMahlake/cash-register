let price = 3.26;
let cid = [
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

const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

function cashRegister(price, cid) {
  if (parseFloat(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    
  } else if (parseFloat(cash.value) === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    const reversedCid = cid.reverse();
    let currentChangeAvailable = cid.reduce((arr, item) => arr + item[1], 0) * 100;
    let change = (parseFloat(cash.value) - price) * 100;
    const moneyValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01].map(el => el * 100)
    const results = []
    changeDue.textContent = "Status: OPEN";
    if (change > currentChangeAvailable) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
  }  else {
    for (let i =0; i < reversedCid.length; i++) {
      if (change >= moneyValues[i] && change > 0) {
        const [value, total] = reversedCid[i];
        const possibleChange = Math.min(total * 100, change);
        const count = Math.floor(possibleChange / moneyValues[i]);
        const amountDue = count * moneyValues[i];
        change -= amountDue;
        currentChangeAvailable -= amountDue;
        cid[cid.length - (1 + i)] -= amountDue;
        if (count > 0) {
          results.push([value, amountDue / 100]);
        }
      } 
    }
    if (currentChangeAvailable === 0) {
    changeDue.textContent = "Status: CLOSED"
  }
    
  }
  
  changeDue.textContent += ` ${(results.map(el => el.map(i => Number(i)? `$${i}`:i).join(": "))).join(" ")}`;
    if (change > 0) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    }

  }
}

purchaseBtn.addEventListener("click", ()=>{
  changeDue.textContent = "";
  cashRegister(price, cid);
  /*if (parseFloat(cash.value) < price) {
      alert("Customer does not have enough money to purchase the item");
      
    } else if (parseFloat(cash.value) === price) {
      changeDue.textContent = "No change due - customer paid with exact cash";
    } else {
      const reversedCid = cid.reverse();
      let currentChangeAvailable = cid.reduce((arr, item) => arr + item[1], 0) * 100;
      let change = (parseFloat(cash.value) - price) * 100;
      const moneyValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01].map(el => el * 100)
      const results = []
      changeDue.textContent = "Status: OPEN";
      if (change > currentChangeAvailable) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }  else {
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
          }
        } 
      }
      if (currentChangeAvailable === 0) {
      changeDue.textContent = "Status: CLOSED"
    }
      
    }
    
    changeDue.textContent += ` ${(results.map(el => el.map(i => Number(i)? `$${i}`:i).join(": "))).join(" ")}`;
      if (change > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      }

    }*/
})


