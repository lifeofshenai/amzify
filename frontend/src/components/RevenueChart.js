import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";

const RevenueChart = () => {
  const chartRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState("October");

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
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
            data: [30, 60, 40, 80, 50, 70, 60, 90, 40, 80, 50, 70],
            fill: true,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.4,
          },
          {
            label: "Profit",
            data: [20, 50, 30, 70, 40, 60, 50, 80, 30, 70, 40, 60],
            fill: true,
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    // Here you can add any logic to change chart data based on the selected month
  };

  return (
    <div
      className="rounded-lg shadow-md  shadow-pink-400 p-8 mb-12"
    >
      {/* Header with title and dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Revenue</h2>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{
            padding: "8px 12px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Chart Container */}
      <div style={{ position: "relative", height: "400px", width: "100%" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RevenueChart;
