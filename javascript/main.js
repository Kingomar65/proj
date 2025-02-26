// (Json)Kinukuha ang mga transactionss mula sa localStorage, kung walang laman, gagamit ng empty array
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// constant values
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");


// nag-uupdate ng mga halaga (balance, income, expense)
function updateTotal() {
    listEl.innerHTML = "";//tinatanggal ang nakalagay sa transactions(empty)
    let incomeTotal = 0, expenseTotal = 0;

    //  Pinapalitan ang bawat transactions ng User 
    transactions.forEach((trx, index) => {
        // Gumagawa ng bagong list item para sa transactions
        const li = document.createElement("li");
        //Kung income o expense
        li.className = trx.type;
        // nillagay yung name, date, type sa css
        li.innerHTML = `${trx.name} (${trx.date}) <span>${trx.type === "income" ? "+" : "-"}₱${trx.amount.toFixed(2)}</span>`;
        li.onclick = () => deleteTransaction(index);
        //nilalagay ang bagong list item ng User 
        listEl.appendChild(li);
        //updated  total income at total expense
        trx.type === "income" ? incomeTotal += trx.amount : expenseTotal += trx.amount;
    });
    // updated User balance
    balanceEl.textContent = `₱${(incomeTotal - expenseTotal).toFixed(2)}`;
    incomeEl.textContent = `₱${incomeTotal.toFixed(2)}`;
    expenseEl.textContent = `₱${expenseTotal.toFixed(2)}`;
    // kinuha ulit sa localstorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
 // delete 
function deleteTransaction(index) {
    if (confirm("Delete this transaction?")) {
        transactions.splice(index, 1);
        updateTotal();
    }
}
// Event listener para sa form submission
form.addEventListener("submit", (e) => {
     e.preventDefault();
// value nang form
const name = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");

//validation
if (!name.value.trim() || isNaN(amount.value) || amount.value <= 0 || !date.value) {
alert("Please enter valid data!");
return;
}
//transaction array
transactions.push({
name: name.value.trim(), // no space
amount: parseFloat(amount.value), //convert
date: date.value,
type: document.getElementById("type").value
});

//loop
form.reset();
updateTotal();
});