// PieChart.js

import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
          },
          width: 400,
          height: 400,
        }}
      />
    </div>
  );
}

export default PieChart;
