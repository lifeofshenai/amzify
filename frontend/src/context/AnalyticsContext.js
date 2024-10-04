import React, {createContext, useState, useEffect} from "react";
import analyticsService from "../services/analyticsService";

// Create the Analytics Context
export const AnalyticsContext = createContext();

// Create the Analytics Provider
export const AnalyticsProvider = ({children}) => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    // Add more metrics as needed
  });

  const [vendorPerformance, setVendorPerformance] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [salesData, setSalesData] = useState({labels: [], data: []});

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
      const analytics = await analyticsService.getAnalytics(queryParams);
      console.log(analytics);
      setMetrics(metricsRes);
      setVendorPerformance(vendorsRes);
      setSalesData(salesRes);
      setProductPerformance(productsRes);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      // Optionally, set error state here
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
