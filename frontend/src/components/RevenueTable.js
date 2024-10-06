import React from "react";
import { FaUserTie, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

// Utility function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const RevenueTable = ({ revenueData }) => {
  console.log("revenue data", revenueData);

  // If no data is available, show a message
  if (!revenueData.length) {
    return (
      <p className="text-gray-600 text-center py-4">
        No revenue data available.
      </p>
    );
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Revenue Per Vendor</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Vendor Name</th>
              <th className="pb-2">Total Sales</th>
              <th className="pb-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">
                  <div className="flex items-center">
                    <FaUserTie className="text-green-500 mr-2" />
                    {item.vendorName}
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-orange-500 mr-2" />$
                    {formatNumberWithCommas(Math.round(item.totalSales))}
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex items-center">
                    <FaChartLine className="text-blue-500 mr-2" />$
                    {formatNumberWithCommas(item.revenue.toFixed(2))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;
