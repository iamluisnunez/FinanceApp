import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "chart.js/auto";
import Totals from "./Total";
import Header from "../assets/Header";
import Guest from "./Guest";
import PieChart from "./PieChart"; // Import the PieChart component

export default function LoggedIn() {
  const [chartData, setChartData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#ff5733", "#33ff57"],
      },
    ],
  });
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

  useEffect(() => {
    // Calculate totalExpenses and totalIncome from transactions
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    // Update chartData based on the calculated values
    setChartData({
      labels: ["Expenses", "Income"],
      datasets: [
        {
          data: [totalExpenses, totalIncome],
          backgroundColor: ["#ff5733", "#33ff57"],
        },
      ],
    });
  }, [transactions]); // Include transactions as a dependency

  return (
    <>
      <Guest />
      {/* Use the PieChart component and pass chartData as a prop */}
      <PieChart chartData={chartData} />
    </>
  );
}
