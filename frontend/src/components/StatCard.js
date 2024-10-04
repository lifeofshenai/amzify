import { motion } from "framer-motion";
import React from "react";

// Statistic Card Component
const StatCard = ({ icon, title, value, sub1, sub2 }) => {
  return (
    <motion.div
      className="flex-1 w-52 p-4 bg-white shadow-lg rounded-lg"
      whileHover={{
        scale: 1.05, // Slightly scale up the card
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Add a deeper shadow on hover
        transition: { duration: 0.3 }, // Smooth transition for the hover effect
      }}
    >
      <div className="flex justify-between items-center mb-2 text-xl text-gray-800">
        <h3 className="text-left text-pink-600 font-bold">{title}</h3>
        <div className="text-pink-600">{icon}</div>
      </div>
      <p className="text-3xl font-extrabold mt-1 text-center">{value}</p>
      <div className="flex justify-between mt-2 text-sm text-black">
        <span>{sub1.label}</span>
        <span>{sub2.label}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>{sub1.value}</span>
        <span>{sub2.value}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;
