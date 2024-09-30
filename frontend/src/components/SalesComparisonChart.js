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

const SalesComparisonChart = () => {
  const data = {
    labels: ["FEB", "MAR", "APR", "MAY", "JUN", "JUL"], // Labels for the months
    datasets: [
      {
        label: "Earned", // First line (Earned)
        data: [10, 30, 20, 50, 30, 40], // Data points for "Earned"
        borderColor: "#f50057", // Tailwind 'pink-500'
        backgroundColor: "rgba(245, 0, 87, 0.1)", // Light pink for the fill
        tension: 0.5, // Curved line
        pointBackgroundColor: "#f50057", // Pink points
        fill: false, // No fill under the curve
      },
      {
        label: "Sales", // Second line (Sales)
        data: [30, 40, 20, 50, 30, 40], // Data points for "Sales"
        borderColor: "#ff9800", // Tailwind 'orange-500'
        backgroundColor: "rgba(255, 152, 0, 0.1)", // Light orange for the fill
        tension: 0.5, // Curved line
        pointBackgroundColor: "#ff9800", // Orange points
        fill: false, // No fill under the curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      y: {
        beginAtZero: false, // Start y-axis at the lowest value
        ticks: {
          callback: function (value) {
            return value + "M"; // Adding 'M' to y-axis labels for millions
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
            return tooltipItem.raw.toFixed(2) + "M"; // Custom tooltip format with 'M'
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">$102.5M</h2>
        <span className="text-gray-500">6 months</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">Total Sales</p>
      <div className="h-full pb-10">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesComparisonChart;
