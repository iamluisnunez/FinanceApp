import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "chart.js/auto"; // Import Chart.js
import { Pie } from "react-chartjs-2"; // Import React ChartJS 2
import "../App.css";
import Totals from "./Total";
import Header from "../assets/Header";
import Guest from "./Guest"; // Import the Guest component

export default function LoggedIn({ transactions }) {
  // Initialize the chartData state
  const [chartData, setChartData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0], // Initialize with zeros
        backgroundColor: ["#ff5733", "#33ff57"],
      },
    ],
  });

  // useEffect to update chartData whenever transactions change
  useEffect(() => {
    // Calculate expenses and income from transactions
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    // Update chartData with the calculated values
    setChartData({
      labels: ["Expenses", "Income"],
      datasets: [
        {
          data: [totalExpenses, totalIncome],
          backgroundColor: ["#ff5733", "#33ff57"],
        },
      ],
    });
  }, [transactions]); // Re-run the effect when transactions change

  return (
    <>
      <Guest />
      <div className="chart">
        <Pie data={chartData} />
      </div>
    </>
  );
}
