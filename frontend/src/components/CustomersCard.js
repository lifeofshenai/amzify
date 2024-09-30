import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const CustomersCard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["New Customers", "Repeated"],
        datasets: [
          {
            data: [1020, 741], // New customers and repeated
            backgroundColor: ["#FF6384", "#FFB84D"], // Pink and orange colors
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        cutout: "50%", // Creates a thinner donut chart
        responsive: true,
        maintainAspectRatio: false,
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
    <div className="bg-white p-8 shadow-lg rounded-lg text-center">
      <h3 className="text-xl font-extrabold mb-4">Customers</h3>
      <div style={{ position: "relative", height: "140px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 flex justify-around  ">
        <p className="text-2xl font-extrabold">10,203</p>
        <p className="text-2xl font-extrabold">441</p>
      </div>
      <div className="flex justify-around mt-1">
        <div className="flex items-center">
          <span className="h-2 w-2 bg-pink-600 rounded-full mr-2"></span>
          <span className="text-sm font-extrabold">New Customers</span>
        </div>
        <div className="flex items-center">
          <span className="h-2 w-2 bg-orange-400 rounded-full mr-2"></span>
          <span className="text-sm font-extrabold">Repeated</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersCard;
