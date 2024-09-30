import React from "react";

const VendorCard = ({ icon, title, count, active, onClick, borderColor }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative 
      ${active ? `border-b-4 ${borderColor}` : ""}`}
    >
      {icon}
      <h3 className="text-md font-bold mt-2">{title}</h3>
      <p className="text-lg font-semibold">{count}</p>
    </div>
  );
};

export default VendorCard;
