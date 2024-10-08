// src/pages/Vendor.js

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SalesComparisonChart from "../../components/SalesComparisonChart";
import SalesTable from "../../components/SalesTable";
import VendorInfo from "../../components/VendorInfo";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../services/instantAxios";

const Vendor = React.memo(() => {
  const { vendorId } = useParams();
  const [salesData, setSalesData] = useState(null);
  const [vendor, setVendor] = useState(null);
    const [topProduct, setTopProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch vendor-specific analytics and orders
  const fetchVendorAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      const [salesRes, vendorRes, vendorProRes] = await Promise.all([
        axiosInstance.get(`/analytics/sales-trends?vendorId=${vendorId}`),
        axiosInstance.get(`/vendors/${vendorId}`),
        axiosInstance.get(`/analytics/top-products/?vendorId=${vendorId}`),
      ]);

      setSalesData(salesRes.data.data);
      setVendor(vendorRes.data.data);
      setTopProduct(vendorProRes.data.data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  // Fetch the data when vendorId changes
  useEffect(() => {
    if (vendorId) {
      fetchVendorAnalytics();
    }
  }, [vendorId, fetchVendorAnalytics]);

  console.log(topProduct)

  return (
    <motion.div
      className="flex flex-col items-center p-2 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Vendor Info Card */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {vendor ? (
          <VendorInfo vendorDetails={vendor.store} />
        ) : (
          <p className="text-red-500">Vendor not found</p>
        )}{" "}
      </motion.div>

      {/* Loading and Error States */}
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Sales Comparison Chart */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <SalesComparisonChart salesData={salesData} />
      </motion.div>

      {/* Sales Table */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <SalesTable topProduct={topProduct} />
      </motion.div>
    </motion.div>
  );
});

export default Vendor;
