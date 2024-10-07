import React, { createContext, useState, useEffect } from "react";
import analyticsService from "../services/analyticsService";

// Create the Analytics Context
export const AnalyticsContext = createContext();

// Create the Analytics Provider
export const AnalyticsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    // Add more metrics as needed
  });

  const [vendorPerformance, setVendorPerformance] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], data: [] });

  // Function to fetch analytics data from your backend
  const fetchAnalytics = async (queryParams = "") => {
    try {
      const [metricsRes, vendorsRes, salesRes, productsRes] = await Promise.all(
        [
          analyticsService.getMetrics(queryParams),
          analyticsService.getVendorRevenue(queryParams),
          analyticsService.getSalesdata(queryParams),
          analyticsService.getTopProducts(queryParams),
        ]
      );

      // console.log("Metrics Response:", metricsRes);
      // console.log("Vendors Response:", vendorsRes);
      // console.log("Sales Data Response:", salesRes);
      // console.log("Product Performance Response:", productsRes);

      setMetrics(metricsRes || { totalSales: 0, totalRevenue: 0 });
      setVendorPerformance(Array.isArray(vendorsRes) ? vendorsRes : []);
      setSalesData(salesRes || { labels: [], data: [] });
      setProductPerformance(Array.isArray(productsRes) ? productsRes : []);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      // Optionally, set error state here or set fallback data
      setMetrics({ totalSales: 0, totalRevenue: 0 });
      setVendorPerformance([]);
      setSalesData({ labels: [], data: [] });
      setProductPerformance([]);
    }
  };

  useEffect(() => {
    fetchAnalytics(); // Fetch analytics data on mount
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        metrics,
        vendorPerformance,
        salesData,
        productPerformance,
        fetchAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
