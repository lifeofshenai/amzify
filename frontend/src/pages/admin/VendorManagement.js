import { Link } from "react-router-dom";
import StatsBar from "../../components/StatsBar";
import { FaPlus } from "react-icons/fa";

const VendorManagement = () => {
  return (
    <div className="p-6 lg:p-10">
      {/* Header with button aligned to the right */}
      <div className="flex justify-between items-center rounded-md shadow-lg p-2 mb-6">
        <h1 className="text-3xl font-bold">Vendors</h1>
        <Link
          to="add-vendor"
          className="flex items-center px-4 py-2 bg-pink-600 btn-sm text-white rounded-lg hover:bg-pink-700"
        >
          <FaPlus className="mr-2" />
          Add Vendor
        </Link>
      </div>

      {/* StatsBar Component */}
      <StatsBar />
    </div>
  );
};

export default VendorManagement;
