import React from "react";
import {
  // FaCalendarAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const VendorTable = ({ data }) => {
  // console.log("data from table", data);
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="rounded">
          <tr className="bg-dark-pink text-white">
            <th className="p-3">Vendor</th>
            <th className="p-3">Email</th>
            <th className="p-3">Store Name</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((store, index) => (
            <tr
              key={store._id}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Vendor Name */}
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={store.vendorDetails.pictureUrl}
                    alt={store.vendor.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{`${store.vendorDetails.firstName} ${store.vendorDetails.lastName}`}</span>
                </div>
              </td>

              {/* Vendor Email */}
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-700" />
                  <span>{store.vendorDetails.email}</span>
                </div>
              </td>

              {/* Store Name */}
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-pink-700" />
                  <span>{store.name}</span>
                </div>
              </td>

              {/* Action (View Profile) */}
              <td className="p-3">
                <button className="btn btn-sm bg-dark-pink hover:bg-primary-pink">
                  <Link
                    to={`/admin/vendor-profile/${store._id}`}
                    className="text-white flex items-center space-x-2"
                  >
                    <span>View Profile</span>
                    <FaExternalLinkAlt />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
