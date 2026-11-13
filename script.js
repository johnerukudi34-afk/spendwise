
// SpendWise - Budget and Expense Tracker
// Developer: John Erukudi

let totalBudget = 50000;

let expenses = [
    { name: "Food", amount: 5000, category: "Food", date: "2026-11-01" },
    { name: "Transport", amount: 3000, category: "Transport", date: "2026-11-02" },
    { name: "Rent", amount: 5000, category: "Rent", date: "2026-11-03" },
    { name: "Entertainment", amount: 1000, category: "Entertainment", date: "2026-11-04" },
    { name: "Utilities", amount: 1000, category: "Utilities", date: "2026-11-05" }
];

// Format money in Kenyan Shillings
function formatMoney(amount) {
    return "KSh " + Number(amount).toLocaleString("en-KE");
}

// Calculate total expenses
function calculateTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Update dashboard
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = totalBudget - totalExpenses;

    document.getElementById("totalBudget").textContent =
        formatMoney(totalBudget);

    document.getElementById("totalExpenses").textContent =
        formatMoney(totalExpenses);

    document.getElementById("remainingBalance").textContent =
        formatMoney(remainingBalance);

    displayExpenses();
}

// Display expenses in table
function displayExpenses() {
    const expenseTable = document.getElementById("expenseList");

    expenseTable.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(expense.name)}</td>
            <td>${formatMoney(expense.amount)}</td>
            <td>${escapeHTML(expense.category)}</td>
            <td>${escapeHTML(expense.date)}</td>
            <td>
                <button onclick="deleteExpense(${index})">
                    Delete
                </button>
            </td>
        `;

        expenseTable.appendChild(row);
    });
}

// Prevent HTML injection in user-entered text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Add a new expense
function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !date) {
        alert("Please enter a valid expense name, amount and date.");
        return;
    }

    if (amount > totalBudget - calculateTotalExpenses()) {
        alert("This expense exceeds your remaining budget.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount,
        category: category,
        date: date
    });

    updateDashboard();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = "";
}

// Delete an expense
function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1);
        updateDashboard();
    }
}

// Change total budget
function updateBudget() {
    const newBudget = Number(prompt("Enter your new budget in KSh:"));

    if (!Number.isFinite(newBudget) || newBudget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    if (newBudget < calculateTotalExpenses()) {
        alert("Your budget cannot be less than your current expenses.");
        return;
    }

    totalBudget = newBudget;
    updateDashboard();
}

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();

    const addButton = document.getElementById("addExpenseBtn");

    if (addButton) {
        addButton.addEventListener("click", addExpense);
    }

    const budgetButton = document.getElementById("updateBudgetBtn");

    if (budgetButton) {
        budgetButton.addEventListener("click", updateBudget);
    }
});
