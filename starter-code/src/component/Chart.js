import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
  const labels = props.holdings.map((d, i) => {
    return d.name;
  });

  const stockWeight = props.holdings.map((d, i) => {
    return Math.round((d.value / props.totalValue) * 100 * 100) / 100;
  });

  console.log(stockWeight);
  const option = {
    plugins: {
      legend: { display: false },
    },
    cutoutPercentage: 20,
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Weight",
        data: stockWeight,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={option} />
    </div>
  );
};

export default Chart;
