import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useRef } from "react";
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

const AllSellsChart = () => {
  const chartRef = useRef(null); // Reference to the chart instance

  const data = {
    labels: [
      "5k",
      "10k",
      "15k",
      "20k",
      "25k",
      "30k",
      "35k",
      "40k",
      "45k",
      "50k",
      "55k",
      "60k",
    ],
    datasets: [
      {
        label: "Sales",
        data: [20, 40, 50, 60, 64.36, 50, 45, 55, 60, 50, 45, 55], // Example data
        borderColor: "#3b82f6", // Tailwind 'blue-500'
        tension: 0.4, // Smooth line
        pointBackgroundColor: "#3b82f6", // Blue points
        pointBorderColor: "#ffffff", // White border for points
        pointHoverRadius: 6, // Enlarge points on hover
        pointRadius: 4, // Default point size
        fill: true, // Enable fill for the area under the line
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Return a fallback color if the chart is not yet initialized
            return null;
          }

          // Create gradient
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)"); // Starting blue shade
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)"); // Transparent at the bottom

          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + "%"; // Adding percentage to the y-axis labels
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
        display: false, // No legend needed
      },
      tooltip: {
        backgroundColor: "#ffffff", // White background for tooltips
        bodyColor: "#000000", // Black text
        borderColor: "#3b82f6", // Border in blue
        borderWidth: 1,
        titleColor: "#3b82f6", // Title in blue
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        cornerRadius: 5, // Rounded tooltips
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw.toFixed(2) + "%"; // Custom tooltip format
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-center mb-4">
        All Sales Details
      </h2>
      <div className="h-full p-8">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default AllSellsChart;
