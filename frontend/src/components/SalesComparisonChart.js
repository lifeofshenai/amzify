import {
  Chart as ChartJS, 
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Utility function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SalesComparisonChart = React.memo(({ salesData }) => {
  if (!salesData || !salesData.sales || salesData.sales.length === 0)
    return null;

  const sales = salesData.sales.map((sale) => sale.monthlySales);
  const labels = salesData.sales.map((sale) => sale._id);
  const earned = sales.map((sale) => sale * 0.1);

  const data = {
    labels,
    datasets: [
      {
        label: "Earned",
        data: earned,
        borderColor: "#f50057",
        backgroundColor: "rgba(245, 0, 87, 0.1)",
        tension: 0.5,
        pointBackgroundColor: "#f50057",
        fill: false,
        borderWidth: 2,
      },
      {
        label: "Sales",
        data: sales,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.1)",
        tension: 0.5,
        pointBackgroundColor: "#ff9800",
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return formatNumberWithCommas(value) + "$";
          },
        },
        grid: { borderColor: "#e5e7eb" },
      },
      x: { grid: { display: false } },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { usePointStyle: true, boxWidth: 6 },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${formatNumberWithCommas(
              Math.round(tooltipItem.raw)
            )}$`,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-white rounded-lg shadow-md p-8">
      <Line data={data} options={options} />
    </div>
  );
});

export default SalesComparisonChart;

