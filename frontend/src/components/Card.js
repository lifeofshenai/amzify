import React from "react";
import { FiArrowUpRight } from "react-icons/fi"; // Arrow icon for growth

const Card = ({ title, value, icon, growth, growthColor, bgColor }) => {
  return (
    <div
      className={`shadow-lg rounded-lg p-4 flex flex-col justify-between w-full bg-white`}
    >
      {/* Icon and Title */}
      <div className="flex justify-between items-center">
        <div className="text-gray-800 font-bold">{title}</div>
        <div className={`p-2 rounded-lg shadow-lg ${bgColor}`}>{icon}</div>
      </div>

      {/* Total Value */}
      <div className="mt-4">
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      </div>

      {/* Growth Info */}
      {growth && (
        <div className={`flex items-center mt-2 ${growthColor}`}>
          <FiArrowUpRight className="mr-1" />
          <p className="text-sm font-medium">{growth}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
