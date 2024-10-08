// src/context/ContextAnalytics.js

import React, { createContext, useState, useEffect } from "react";
import serviceAnalytics from "../services/serviceAnalytics";

// Create Global Context
export const GlobalContext = createContext();

// Custom hook to use the GlobalContext
export const useGlobalContext = () => React.useContext(GlobalContext);

// Create the Global Provider
export const GlobalProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({ totalSales: 0, totalRevenue: 0 });
  const [vendorPerformance, setVendorPerformance] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], data: [] });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetching analytics data function
  const fetchAnalytics = async (queryParams = "") => {
    setLoading(true);
    setError(null);
    try {
      const [metricsRes, vendorsRes, salesRes, productsRes] = await Promise.all(
        [
          serviceAnalytics.getMetrics(queryParams),
          serviceAnalytics.getVendorRevenue(queryParams),
          serviceAnalytics.getSalesData(queryParams),
          serviceAnalytics.getTopProducts(queryParams),
        ]
      );

      setMetrics(metricsRes || { totalSales: 0, totalRevenue: 0 });
      setVendorPerformance(
        vendorsRes && Array.isArray(vendorsRes.revenueData)
          ? vendorsRes.revenueData
          : []
      );
      setSalesData(salesRes || { labels: [], data: [] });
      setProductPerformance(
        productsRes && Array.isArray(productsRes.topProducts)
          ? productsRes.topProducts
          : []
      );
    } catch (err) {
      setError("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders data function
  const fetchOrders = async (queryParams = "") => {
    setLoading(true);
    setError(null);
    try {
      const ordersRes = await serviceAnalytics.getOrders(queryParams);
      setOrders(ordersRes || []);
    } catch (err) {
      setError("Failed to fetch orders data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchAnalytics();
  }, []);


  return (
    <GlobalContext.Provider
      value={{
        metrics,
        vendorPerformance,
        productPerformance,
        salesData,
        orders,
        fetchAnalytics,
        fetchOrders,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
