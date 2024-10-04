import React from "react";
import ProfileCard from "./ProfileCard";
import StatCard from "./StatCard";
import { FaBoxes, FaShoppingCart, FaDollarSign } from "react-icons/fa";

// Vendor Profile Dashboard
const VendorProfile = () => {
  return (
    <div className="flex justify-around space-x-4">
      {/* Profile Card */}
      <ProfileCard />

      {/* Statistics Cards */}
      <div className="flex space-x-4">
        <StatCard
          icon={<FaBoxes />}
          title="Products"
          value="198"
          sub1={{ label: "In Stock", value: 150 }}
          sub2={{ label: "Out of stock", value: 48 }}
        />
        <StatCard
          icon={<FaShoppingCart />}
          title="Total Sales"
          value="3,921"
          sub1={{ label: "Completed", value: 3900 }}
          sub2={{ label: "Refunded", value: 21 }}
        />
        <StatCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value="$94.5k"
          sub1={{ label: "This month", value: "$15,900" }}
          sub2={{ label: "This year", value: "$49,920" }}
        />
      </div>
    </div>
  );
};

export default VendorProfile;
