import React from "react";
import AllSellsChart from "../../components/AllSellsChart";
import Card from "../../components/Card";
import SalesComparisonChart from "../../components/SalesComparisonChart"; 
import SalesTable from "../../components/SalesTable"; 
import { cardData } from "../../constants/data";
import RevenueChart from "../../components/RevenueChart";

import CustomersCard from "../../components/CustomersCard";
import FeaturedProductCard from "../../components/FeaturedProductCard ";
import SalesAnalyticsCard from "../../components/SalesAnalyticsCard";


const Analytics = () => {
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
            growth={card.growth}
            growthIcon={card.growthIcon}
            bgColor={card.bgColor}
          />
        ))}
      </div>

      {/* Sales Chart - Full Width & Responsive */}
      <div className="w-full p-2 mt-8 h-96 sm:h-[400px] lg:h-[500px]">
        <AllSellsChart />
      </div>

      {/* Revenue Chart - Full Width & Responsive */}
      <div className="w-full p-2 my-4 h-96 sm:h-[400px] lg:h-[500px]">
        <RevenueChart />
      </div>

      {/* Row for SalesComparisonChart and SalesTable */}
      <div className="bg-white p-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <SalesComparisonChart />
          </div>
          <div className="h-full mt-5">
            <SalesTable />
          </div>
        </div>
      </div>

      {/* New Section for CustomersCard, SalesAnalyticsCard, and FeaturedProductCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CustomersCard /> 
        <SalesAnalyticsCard /> 
        <FeaturedProductCard /> 
      </div>
    </div>
  );
};

export default Analytics;
