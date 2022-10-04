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

  const color = props.holdings.map((d, i) => {
    return d.color;
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
        backgroundColor: color,

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
