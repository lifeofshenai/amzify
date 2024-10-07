import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import Loader from "../../components/Loader";
import SalesComparisonChart from "../../components/SalesComparisonChart";
import SalesTable from "../../components/SalesTable";
import VendorInfo from "../../components/VendorInfo";
import axiosInstance from "../../services/instantAxios";
import {useParams} from "react-router-dom";
import {useGlobalContext} from "../../context/ContextAnalytics";

const Vendor = () => {
  const {vendorId} = useParams();

  // Local state for vendor-specific data
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global context for sales data
  const {
    salesData,
    loading: globalLoading,
    error: globalError,
    productPerformance,
    fetchAnalytics,
  } = useGlobalContext();

  // Fetch vendor data when vendorId changes
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/vendors/${vendorId}`);
        setVendorData(response.data.data.store);
        fetchAnalytics(`vendorId=${vendorId}`); // Query vendor-specific analytics
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [vendorId, fetchAnalytics]);

  // Conditional render function for error or loader
  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div className="text-red-600 p-4">{`Error: ${error}`}</div>;
    }

    if (!vendorData) {
      return <div className="text-gray-600 p-4">No Vendor Data Available</div>;
    }

    return <VendorInfo {...vendorData} />;
  };

  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-gray-100 min-h-screen"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
    >
      {/* Vendor Info Card */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{duration: 0.3}}
      >
        {renderContent()} {/* Render vendor data, loader, or error */}
      </motion.div>

      {/* Sales Comparison Chart */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{duration: 0.3}}
      >
        {globalLoading ? (
          <Loader /> // Global loading spinner for sales data
        ) : globalError ? (
          <div className="text-red-600 p-4">{`Error: ${globalError}`}</div> // Global error for sales data
        ) : (
          <SalesComparisonChart salesData={salesData.sales} />
        )}
      </motion.div>

      {/* Sales Table */}
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{duration: 0.3}}
      >
        <SalesTable
          productPerformance={productPerformance.topProducts}
          loading={globalLoading}
        />
      </motion.div>
    </motion.div>
  );
};

export default Vendor;
