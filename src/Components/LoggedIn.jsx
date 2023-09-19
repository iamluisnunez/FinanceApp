// Your main component (e.g., LoggedIn.jsx)

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "chart.js/auto";
import Totals from "./Total";
import Header from "../assets/Header";
import Guest from "./Guest";
import ExpenseIncomeApp from "./Guest";
import PieChart from "./PieChart"; // Import the PieChart component

export default function LoggedIn({ transactions }) {
  const [chartData, setChartData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#ff5733", "#33ff57"],
      },
    ],
  });

  useEffect(() => {
    const transactions = ExpenseIncomeApp.transactions;
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    setChartData({
      labels: ["Expenses", "Income"],
      datasets: [
        {
          data: [totalExpenses, totalIncome],
          backgroundColor: ["#ff5733", "#33ff57"],
        },
      ],
    });
  }, []);

  return (
    <>
      <Guest />
      {/* Use the PieChart component and pass chartData as a prop */}
      <PieChart chartData={chartData} />
    </>
  );
}
