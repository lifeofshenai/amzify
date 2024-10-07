import React, {createContext, useCallback, useEffect, useState} from "react";
import analyticsService from "../services/serviceAnaltics";

// Create Global Context
export const GlobalContext = createContext();

// Create the Global Provider
export const GlobalProvider = ({children}) => {
  // Define state for the metrics, vendor performance, sales data, and product performance
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalRevenue: 0,
  });

  const [vendorPerformance, setVendorPerformance] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [salesData, setSalesData] = useState({labels: [], data: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetching analytics data function
  const fetchAnalytics = async (queryParams = "") => {
    setLoading(true);
    setError(null);
    try {
      const [metricsRes, vendorsRes, salesRes, productsRes] = await Promise.all(
        [
          analyticsService.getMetrics(queryParams),
          analyticsService.getVendorRevenue(queryParams),
          analyticsService.getSalesdata(queryParams),
          analyticsService.getTopProducts(queryParams),
        ]
      );

      // console.log("vendorsRes Data Response:", vendorsRes);
      // console.log("product performance",productPerformance);
      // Set data or fallback values
      setMetrics(metricsRes || {totalSales: 0, totalRevenue: 0});
      setVendorPerformance(
        Array.isArray(vendorsRes.revenueData) ? vendorsRes : []
      );
      setSalesData(salesRes || {labels: [], data: []});
      setProductPerformance(
        Array.isArray(productsRes.topProducts) ? productsRes : []
      );
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setError("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch analytics data on component mount
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        metrics,
        vendorPerformance,
        productPerformance,
        salesData,
        fetchAnalytics,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => React.useContext(GlobalContext);
