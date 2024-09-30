// components/VendorTable.js
import React from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";

const VendorTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        {/* Table Head */}
        <thead>
          <tr className="bg-pink-700 text-white">
            <th className="">#</th>
            <th className="">Vendor</th>
            <th className="">Email</th>
            <th className="">Phone</th>
            <th className=" ">Date Joined</th>
            <th className="">Products Uploaded</th>
            <th className="">Total Sales</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((vendor, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <th className="">{index + 1}</th>

              {/* Vendor Name */}
              <td className="">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-pink-700" />
                  <span>{vendor.fullName}</span>
                </div>
              </td>

              {/* Vendor Email */}
              <td className="">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-700" />
                  <span>{vendor.email}</span>
                </div>
              </td>

              {/* Vendor Phone */}
              <td className="">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-pink-700" />
                  <span>{vendor.phone}</span>
                </div>
              </td>

              {/* Date Joined */}
              <td className="">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-pink-700" />
                  <span>{vendor.dateJoined}</span>
                </div>
              </td>

              {/* Products Uploaded */}
              <td className="">
                <div className="flex items-center space-x-2">
                  <FaBox className="text-pink-700" />
                  <span>{vendor.productUp}</span>
                </div>
              </td>

              {/* Total Sales */}
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <FaDollarSign className="text-pink-700" />
                  <span>${vendor.totalSales}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
