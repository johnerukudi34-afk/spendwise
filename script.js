let budget = 50000;
let expenses = [];

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

function updateDashboard() {
    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount, 0
    );

    document.getElementById("budget").textContent =
        `KSh ${budget.toLocaleString()}`;

    document.getElementById("expenses").textContent =
        `KSh ${total.toLocaleString()}`;

    document.getElementById("balance").textContent =
        `KSh ${(budget - total).toLocaleString()}`;
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = document.createElement("tr");

        [expense.name, `KSh ${expense.amount.toLocaleString()}`,
            expense.category, expense.date].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            expenses.splice(index, 1);
            displayExpenses();
            updateDashboard();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        expenseList.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("category").value;

    if (!name || !category || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    });

    displayExpenses();
    updateDashboard();

    form.reset();
});

updateDashboard();