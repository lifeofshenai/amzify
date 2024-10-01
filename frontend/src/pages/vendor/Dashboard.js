import DashboardStats from "../../components/DashboardStats";
import SaleSummary from "../../components/SaleSummary";
import TopProductsTable from "../../components/TopProductsTable";


const VendorDashboard = () => {
  return (
    <div>
      {/* Dashboard Stats */}
      <DashboardStats />
      <SaleSummary />
      <TopProductsTable />
      
      {/* Orders Table */}
      {/* <OrdersTable /> */}
      
      {/* Top Products Table */}
      {/* <TopProductsTable /> */}
    </div>
  );
};

export default VendorDashboard;