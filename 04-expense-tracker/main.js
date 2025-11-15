const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  //  lấy giá trị và dùng hàm trim() để xoá khoảng trắng ở đầu và cuối
  const amount = parseFloat(amountEl.value);

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSumary();

  transactionFormEl.reset();
}

function updateSumary() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expense);
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";
  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expenses");
  li.innerHTML = `
  <span>${transaction.description}</span>
  <span>${formatCurrency(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  </span>
  `;
  return li;
}

function formatCurrency(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSumary();
}
updateTransactionList();
updateSumary();

// Hàm filter() tạo một danh sách các mảng mới
// chứa những phần tử thoả mãn điều kiện

// Hàm reduce() gom tất cả các phần tử trong mảng thành 1 giá trị duy nhất.
