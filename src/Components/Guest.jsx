import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../App.css"; // Import your custom CSS if needed
import Totals from "./Total";
import Header from "../assets/Header";

function ExpenseIncomeApp() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleAddTransaction = () => {
    if (description.trim() === "" || amount === "") {
      return;
    }

    const newTransaction = {
      id: new Date().getTime(),
      description,
      amount: parseFloat(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Expense and Income Tracker</h1>
        <div className="transaction-form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
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
          <div className="mb-3">
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button className="btn navButton" onClick={handleAddTransaction}>
            Add
          </button>
        </div>
        <div className="transaction-list mt-4">
          <h2>Transactions</h2>
          <ul className="list-group">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className={`list-group-item ${
                  transaction.type === "expense"
                    ? "list-group-item-danger"
                    : "list-group-item-success"
                } d-flex justify-content-between align-items-center`}
              >
                <div>
                  {transaction.description}: {transaction.amount}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Totals transactions={transactions} />
      </div>
    </>
  );
}

export default ExpenseIncomeApp;
