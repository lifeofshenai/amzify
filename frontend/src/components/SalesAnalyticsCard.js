import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const SalesAnalyticsCard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2015", "2016", "2017", "2018", "2019"],
        datasets: [
          {
            label: "Sales",
            data: [30, 50, 35, 75, 90],
            borderColor: "#FF6384", // Pink color
            fill: false,
            tension: 0.4,
            pointBackgroundColor: "#FF6384",
            pointBorderWidth: 3,
          },
          {
            label: "Profit",
            data: [20, 45, 30, 60, 85],
            borderColor: "#FFB84D", // Orange color
            fill: false,
            tension: 0.4,
            pointBackgroundColor: "#FFB84D",
            pointBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100 },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
      <h3 className="text-xl font-extrabold mb-4">Sales Analytics</h3>
      <div
        style={{ position: "relative", height: "200px" }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default SalesAnalyticsCard;
