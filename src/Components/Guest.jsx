import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Totals from "./Total";
import Header from "../assets/Header";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";

function ExpenseIncomeApp() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const user_id = Cookies.get("user_id");
  const [pieChartData, setPieChartData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#ff5733", "#33ff57"],
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await axios.get(
          `http://localhost:3000/users/users/expenses/${user_id}`
        );
        setExpenses(expenseResponse.data);
        const incomeResponse = await axios.get(
          `http://localhost:3000/users/users/income/${user_id}`
        );
        setIncome(incomeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch expenses and income when the component mounts
  }, []);
  useEffect(() => {
    console.log("Expenses:", expenses);
    console.log("Income:", income);
  }, [expenses, income]);

  const handleAddTransaction = async () => {
    if (description.trim() === "" || amount === "") {
      return;
    }

    const newTransaction = {
      userId: user_id,
      description,
      amount: parseFloat(amount),
      type,
    };

    try {
      if (type === "income") {
        await axios.post("http://localhost:3000/users/income", newTransaction);
        fetchIncome();
      } else if (type === "expense") {
        await axios.post(
          "http://localhost:3000/users/expenses",
          newTransaction
        );
        fetchExpenses();
      }

      setTransactions([...transactions, newTransaction]);
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  const handleDeleteTransaction = (transactionId) => {
    try {
      // Make a copy of the current transactions array and filter out the one to be deleted.
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );

      // Update the transactions state with the filtered array.
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
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
