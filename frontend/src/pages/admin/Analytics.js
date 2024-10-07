import React from "react";
import {
  FaArrowRight,
  FaArrowUp,
  FaClipboardList,
  FaDollarSign,
  FaHourglassHalf,
  FaUsers,
} from "react-icons/fa";
// import AllSellsChart from "../../components/AllSellsChart";
import Card from "../../components/Card";

import LoadingSpinner from "../../components/LoadingSpinner";
// import RevenueChart from "../../components/RevenueChart";
import RevenueTable from "../../components/RevenueTable";
import SalesComparisonChart from "../../components/SalesComparisonChart";
import { useGlobalContext } from "../../context/ContextAnalytics";

const Analytics = () => {
  // Access data from the global context
  const { metrics, vendorPerformance, salesData, loading, error } =
    useGlobalContext();

  const cardData = [
    {
      id: 1,
      title: "Total Vendors",
      value:
        metrics.vendors && metrics.vendors.length > 0
          ? metrics.vendors[0].count
          : 0,
      icon: <FaUsers className="text-blue-500" size={24} />,
      growth: "8.5% Up from yesterday",
      growthIcon: <FaArrowUp className="text-green-600" />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Orders",
      value: metrics.totalOrders
        ? metrics.totalOrders.toLocaleString() // Format with commas
        : 0, // Fallback if totalOrders is not available
      icon: <FaClipboardList className="text-yellow-500" size={24} />,
      growth: "1.3% Up from past week",
      growthIcon: <FaArrowRight className="text-green-600" />,
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Total Revenue",
      value: metrics.totalRevenue
        ? `$${Math.round(metrics.totalRevenue).toLocaleString()}` // Format as currency
        : "$0", // Fallback if totalRevenue is not available
      icon: <FaDollarSign className="text-green-500" size={24} />,
      growth: "4.3% Down from yesterday",
      growthIcon: <FaArrowUp className="text-green-600" />,
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      title: "Total GMV",
      value: metrics.totalGMV
        ? `$${Math.round(metrics.totalGMV).toLocaleString()}` // Format as currency
        : "$0", // Fallback if totalGMV is not available
      icon: <FaHourglassHalf className="text-red-500" size={24} />,
      growth: "1.8% Up from yesterday",
      growthIcon: <FaArrowRight className="text-red-600" />,
      bgColor: "bg-red-100",
    },
  ];

  // Handle loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 m-2">
      <h1 className="text-2xl underline text-gray-500 font-bold mb-6">
        Analytics
      </h1>

      {/* Responsive grid layout for Card components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            growth={card.growth} // Include growth if available
            growthIcon={card.growthIcon}
            bgColor={card.bgColor}
          />
        ))}
      </div>

      {/* Sales Chart - Full Width & Responsive */}
      <div className="w-full p-2 mt-8 h-96 sm:h-[400px] lg:h-[500px]">
        <SalesComparisonChart salesData={salesData.sales} />{" "}
      </div>

      {/* Revenue Chart - Full Width & Responsive */}
      {/* <div className="w-full p-2 my-4 h-96 sm:h-[400px] lg:h-[500px]">
        <RevenueChart revenueData={metrics.totalRevenue} />{" "}
      </div> */}

      {/* Row for SalesComparisonChart and SalesTable */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <SalesComparisonChart salesData={salesData} />{" "}
          </div>
        </div> */}
        <div className="h-full mt-5 rounded-lg">
          <RevenueTable
            revenueData={vendorPerformance.revenueData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
