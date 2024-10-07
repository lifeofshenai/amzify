import React, { useContext } from "react";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { AnalyticsContext } from "../../context/AnalyticsContext";
import MetricCard from "../common/MetricCard";

const DashboardMetrics = () => {
  const { metrics } = useContext(AnalyticsContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total GMV"
        value={`$${metrics.totalGMV ?? 0}`}
        icon={<FaShoppingCart size={24} />}
      />
      <MetricCard
        title="Total Revenue"
        value={`$${metrics.totalRevenue ?? 0}`}
        icon={<FaDollarSign size={24} />}
      />
      {metrics.vendors?.map((vendor) => (
        <MetricCard
          key={vendor.status} // Always add a unique key when rendering lists
          title={`${vendor.status} Vendors`}
          value={vendor.count ?? 0}
          icon={<FaDollarSign size={24} />}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;
