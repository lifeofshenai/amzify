import { motion } from "framer-motion";
import React from "react";
import { FaChartLine, FaMoneyBillWave, FaUserTie } from "react-icons/fa";

// Utility function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const RevenueTable = React.memo(({ revenueData }) => {
  if (!revenueData || revenueData.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        No revenue performance data available.
      </div>
    );
  }

  

  return (
    <div className="p-2">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-dark-pink font-bold text-white">Vendor</th>
              <th className="bg-dark-pink font-bold text-white">Total Sales</th>
              <th className="bg-dark-pink font-bold text-white">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item, index) => (
              <motion.tr
                key={item.vendorId || index}
                whileHover={{ scale: 1.03 }}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-200"
                } hover:bg-gray-100 font-medium`}
              >
                {/* Vendor Name */}
                <td className="p-4">
                  <div className="flex items-center">
                    <FaUserTie className="inline-block text-green-500 mr-2" />
                    {item.vendorName}
                  </div>
                </td>

                {/* Total Sales */}
                <td className="p-4">
                  <FaMoneyBillWave className="inline-block text-orange-500 mr-2" />
                  ${formatNumberWithCommas(Math.round(item.totalSales))}
                </td>

                {/* Revenue */}
                <td className="p-4">
                  <FaChartLine className="inline-block text-blue-500 mr-2" />$
                  {formatNumberWithCommas(item.revenue.toFixed(2))}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default RevenueTable;
