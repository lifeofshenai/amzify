import React, {useContext} from "react";
import {AnalyticsContext} from "../../context/AnalyticsContext";
import {Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const {salesData} = useContext(AnalyticsContext);

  const data = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: "Sales",
        data: salesData.data || salesData || [],
        fill: false,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {position: "top"},
      title: {display: true, text: "Sales Over Time"},
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
