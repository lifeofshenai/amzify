// src/services/serviceAnalytics.js

import axiosInstance from "./instantAxios";

const serviceAnalytics = {
  fetchVendorData: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(`/vendors?${queryParams}`);

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch vendor data");
      }
    } catch (error) {
      console.error("fetchVendorData error:", error);
      throw new Error(error.message || "Error fetching vendor data");
    }
  },
  getMetrics: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(
        `/analytics/metrics?${queryParams}`
      );

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Unable to fetch metrics data"
        );
      }
    } catch (error) {
      console.error("getMetrics error:", error);
      throw new Error(error.message || "Error fetching metrics");
    }
  },

  getVendorRevenue: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(
        `/analytics/revenue-per-vendor?${queryParams}`
      );

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Unable to fetch vendor revenue data"
        );
      }
    } catch (error) {
      console.error("getVendorRevenue error:", error);
      throw new Error(error.message || "Error fetching vendor revenue");
    }
  },

  getOrders: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(`/orders?${queryParams}`);
      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch orders");
      }
    } catch (error) {
      console.error("getOrders error:", error);
      throw new Error(error.message || "Error fetching orders");
    }
  },

  getSalesData: async (queryParams = "") => {
    // Renamed to camelCase for consistency
    try {
      const response = await axiosInstance.get(
        `/analytics/sales-trends?${queryParams}`
      );

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch sales data");
      }
    } catch (error) {
      console.error("getSalesData error:", error);
      throw new Error(error.message || "Error fetching sales data");
    }
  },

  getTopProducts: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(
        `/analytics/top-products?${queryParams}`
      );
      // Removed console.log for cleaner production code

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Unable to fetch top products"
        );
      }
    } catch (error) {
      console.error("getTopProducts error:", error);
      throw new Error(error.message || "Error fetching top products");
    }
  },

  getAnalytics: async (queryParams = "") => {
    try {
      const response = await axiosInstance.get(`/analytics?${queryParams}`);

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Unable to fetch analytics data"
        );
      }
    } catch (error) {
      console.error("getAnalytics error:", error);
      throw new Error(error.message || "Error fetching analytics data");
    }
  },
};

export default serviceAnalytics;
