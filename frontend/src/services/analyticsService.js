import axiosInstance from "../services/instantAxios";

const analyticsService = {
  getMetrics: async (queryParams) => {
    try {
      const response = await axiosInstance.get(
        `/analytics/metrics?${queryParams}`
      );
      // console.log(response.data);

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch data");
      }
    } catch (error) {
      throw error;
    }
  },

  getVendorRevenue: async (queryParams) => {
    try {
      const response = await axiosInstance.get(
        `/analytics/revenue-per-vendor?${queryParams}`
      );
      console.log(response.data);

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch data");
      }
    } catch (error) {
      throw error;
    }
  },

  getSalesdata: async (queryParams) => {
    try {
      const response = await axiosInstance.get(
        `/analytics/sales-trends?${queryParams}`
      );
      // console.log(response.data);
      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch data");
      }
    } catch (error) {
      throw error;
    }
  },

  getTopProducts: async (queryParams) => {
    try {
      const response = await axiosInstance.get(
        `/analytics/top-products?${queryParams}`
      );

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch data");
      }
    } catch (error) {
      throw error;
    }
  },

  getAnalytics: async (queryParams) => {
    try {
      const response = await axiosInstance.get(`/analytics?${queryParams}`);

      if (response.data.type === "Success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Unable to fetch data");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default analyticsService;