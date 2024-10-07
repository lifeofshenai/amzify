import {
  CategoryScale,
  Chart as ChartJS,
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
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Utility function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SalesComparisonChart = ({ salesData }) => {
  // Check if salesData is defined
  if (!salesData || !Array.isArray(salesData)) return null;

  const sales = salesData.map((sale) => sale.monthlySales);
  const labels = salesData.map((sale) => sale._id);

  // Calculate earned values based on sales data (assuming 10% earnings)
  const earned = sales.map((sale) => sale * 0.1);

  const data = {
    labels: labels, // Dynamic labels from salesData
    datasets: [
      {
        label: "Earned", // Earned line
        data: earned, // Dynamic earned data
        borderColor: "#f50057", // Tailwind 'pink-500'
        backgroundColor: "rgba(245, 0, 87, 0.1)", // Light pink for the fill
        tension: 0.5, // Curved line
        pointBackgroundColor: "#f50057", // Pink points
        fill: false, // No fill under the curve
        borderWidth: 2, // Thicker line for visibility
      },
      {
        label: "Sales", // Sales line
        data: sales, // Dynamic sales data
        borderColor: "#ff9800", // Tailwind 'orange-500'
        backgroundColor: "rgba(255, 152, 0, 0.1)", // Light orange for the fill
        tension: 0.5, // Curved line
        pointBackgroundColor: "#ff9800", // Orange points
        fill: false, // No fill under the curve
        borderWidth: 2, // Thicker line for visibility
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at zero
        ticks: {
          callback: function (value) {
            return formatNumberWithCommas(value) + "$"; // Adding '$' to y-axis labels
          },
        },
        grid: {
          display: true,
          borderColor: "#e5e7eb", // Light grid lines (gray-200)
        },
      },
      x: {
        grid: {
          display: false, // No vertical grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "top",
        labels: {
          usePointStyle: true, // Use points for the labels
          boxWidth: 6,
        },
      },
      tooltip: {
        backgroundColor: "#ffffff", // White background for tooltips
        titleColor: "#000000", // Title in black
        titleFont: {
          weight: "bold",
        },
        bodyColor: "#000000", // Black text
        bodyFont: {
          size: 12,
        },
        cornerRadius: 4, // Rounded tooltips
        borderColor: "#ddd", // Tooltip border
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${formatNumberWithCommas(
              Math.round(tooltipItem.raw)
            )}$`; // Custom tooltip format with '$'
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">
          $
          {formatNumberWithCommas(
            Math.round(sales.reduce((acc, val) => acc + val, 0))
          )}{" "}
          {/* Total Sales */}
        </h2>
        <span className="text-gray-500">{labels.length} months</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">Total Sales and Earned</p>
      <div className="h-full pb-10">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesComparisonChart;
  