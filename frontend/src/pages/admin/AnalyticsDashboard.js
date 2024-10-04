import React from "react";
import DashboardMetrics from "../../components/dashboard/DashboardMetrics";
import SalesChart from "../../components/common/SalesChart";
import VendorPerformanceTable from "../../components/common/VendorPerformanceTable";
import Filters from "../../components/common/Filters";

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
      <Filters />
      <DashboardMetrics />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <VendorPerformanceTable />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
