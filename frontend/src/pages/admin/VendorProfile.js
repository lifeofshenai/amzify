import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SalesComparisonChart from "../../components/SalesComparisonChart";
import SalesTable from "../../components/SalesTable";
import VendorInfo from "../../components/VendorInfo";
import axiosInstance from "../../services/instantAxios";
import { useParams } from "react-router-dom";

const Vendor = () => {
  const { vendorId } = useParams();
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/vendors/${vendorId}`);
        setVendorData(response.data.data.store);
        console.log("response.data.data.store", response.data.data.store);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [vendorId]);
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {loading && <Loader />}
        {error && <div className="text-red-600 p-4">{`Error: ${error}`}</div>}
        {!loading && vendorData && <VendorInfo {...vendorData} />}
      </motion.div>

      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg mb-4"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <SalesComparisonChart />
      </motion.div>

      <motion.div
        className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <SalesTable />
      </motion.div>
    </motion.div>
  );
};

export default Vendor;
