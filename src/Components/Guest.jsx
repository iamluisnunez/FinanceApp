import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Totals from "./Total";
import Header from "../assets/Header";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import axios from "axios";

function ExpenseIncomeApp() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [pieChartData, setPieChartData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#ff5733", "#33ff57"],
      },
    ],
  });

  const handleAddTransaction = async () => {
    if (description.trim() === "" || amount === "") {
      return;
    }

    const newTransaction = {
      id: new Date().getTime(),
      description,
      amount: parseFloat(amount),
      type,
    };

    try {
      if (type === "income") {
        await axios.post("http://localhost:3000/users/income", newTransaction);
      } else if (type === "expense") {
        await axios.post(
          "http://localhost:3000/users/expenses",
          newTransaction
        );
      }

      setTransactions([...transactions, newTransaction]);
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  useEffect(() => {
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    setPieChartData({
      labels: ["Expenses", "Income"],
      datasets: [
        {
          data: [totalExpenses, totalIncome],
          backgroundColor: ["#ff5733", "#33ff57"],
        },
      ],
    });
  }, [transactions]);

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
        <Pie data={pieChartData} />
        <Totals transactions={transactions} />
      </div>
    </>
  );
}

export default ExpenseIncomeApp;
