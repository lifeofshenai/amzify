import React, { useContext } from "react";
import { AnalyticsContext } from "../../context/AnalyticsContext";

const VendorPerformanceTable = () => {
  const { vendorPerformance } = useContext(AnalyticsContext);

  // Ensure vendorPerformance is an array; use an empty array if it's not.
  const safeVendorPerformance = Array.isArray(vendorPerformance)
    ? vendorPerformance
    : [];

  return (
    <div className="bg-white shadow rounded p-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sales
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {safeVendorPerformance.length > 0 ? (
            safeVendorPerformance.map((vendor) => (
              <tr key={vendor.vendorName}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vendor.vendorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vendor.sales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`$${vendor.revenue}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No vendor performance data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorPerformanceTable;
