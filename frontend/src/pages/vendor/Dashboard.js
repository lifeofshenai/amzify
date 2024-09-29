import DashboardStats from "../../components/DashboardStats";
import OrdersTable from "../../components/OrdersTable";
import TopProductsTable from "../../components/TopProductsTable";


const VendorDashboard = () => {
  return (
    <div>
      {/* Dashboard Stats */}
      <DashboardStats />
      
      {/* Orders Table */}
      <OrdersTable />
      
      {/* Top Products Table */}
      <TopProductsTable />
    </div>
  );
};

export default VendorDashboard;