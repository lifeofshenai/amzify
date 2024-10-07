import React, { useRef } from "react"; // Add this to fix the 'useRef' error
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2"; // Add this to fix the 'Line' component error

// Register chart elements
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const AllSellsChart = ({ salesData = [] }) => {
  const chartRef = useRef(null); // Reference to the chart instance

  // Ensure salesData is an array before proceeding
  const formattedSalesData = Array.isArray(salesData.sales)
    ? salesData.sales
    : [];

  // Map sales data to the format needed by the chart
  const labels = formattedSalesData.map((sale) => sale._id); // Extract month (e.g., '2024-07', '2024-08')
  const sales = formattedSalesData.map((sale) => sale.monthlySales); // Extract monthly sales

  const data = {
    labels: labels, // Months as labels
    datasets: [
      {
        label: "Monthly Sales",
        data: sales, // Monthly sales values
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
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

          return gradient;
        },
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
            return value + "$"; // Add dollar sign for sales data
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
            return "$" + tooltipItem.raw.toFixed(2); // Custom tooltip format
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-center mb-4">
        Monthly Sales Details
      </h2>
      <div className="h-full p-8">
        <Line ref={chartRef} data={data} options={options} />{" "}
        {/* Use the Line component */}
      </div>
    </div>
  );
};

export default AllSellsChart;
