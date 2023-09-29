import React, { useState } from "react";

const GuestFinal = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);

  const addExpense = () => {
    if (description.trim() === "" || isNaN(amount) || +amount <= 0) {
      return;
    }

    const newExpense = {
      description: description,
      amount: +amount,
    };

    setExpenses([...expenses, newExpense]);
    setTotal(total + +amount);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    const deletedAmount = updatedExpenses.splice(index, 1)[0].amount;
    setExpenses(updatedExpenses);
    setTotal(total - deletedAmount);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Guest Expenses Tracker</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={addExpense}>
        Add Expense
      </button>

      {expenses.length > 0 && (
        <div className="mt-4">
          <h2>Expenses</h2>
          <ul className="list-group">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {expense.description}: ${expense.amount}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteExpense(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <h4>Total Expenses: ${total}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestFinal;
