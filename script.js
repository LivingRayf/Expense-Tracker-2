// Select elements
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const addBtn = document.getElementById("add-btn");
const transactionListEl = document.getElementById("transaction-list");

const balanceEl = document.getElementById("total-balance");
const incomeEl = document.getElementById("total-income");
const expenseEl = document.getElementById("total-expenses");

// Global Transactions Array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Event Listeners
document.addEventListener("DOMContentLoaded", renderUI);
addBtn.addEventListener("click", addTransaction);

// Add Transaction
function addTransaction() {
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value.trim());
  const type = typeEl.value;

  if (!description || isNaN(amount)) {
    alert("Please enter valid details!");
    return;
  }

  const newTransaction = {
    id: Date.now(),
    description,
    amount: type === "expense" ? -amount : amount,
    type
  };

  transactions.push(newTransaction);
  updateLocalStorage();
  renderUI();
  clearInputs();
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  updateLocalStorage();
  renderUI();
}

// Update Local Storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Render UI
function renderUI() {
  transactionListEl.innerHTML = "";

  let income = 0;
  let expenses = 0;

  transactions.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.description} 
      <span class="${item.amount > 0 ? "green" : "red"}">${item.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${item.id})">Delete</button>
    `;
    transactionListEl.appendChild(li);

    if (item.amount > 0) income += item.amount;
    else expenses += item.amount;
  });

  balanceEl.innerText = (income + expenses).toFixed(2);
  incomeEl.innerText = income.toFixed(2);
  expenseEl.innerText = (-expenses).toFixed(2);
}

// Clear Input Fields
function clearInputs() {
  descriptionEl.value = "";
  amountEl.value = "";
  typeEl.value = "income";
}


