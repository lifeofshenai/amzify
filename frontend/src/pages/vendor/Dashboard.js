import DashboardStats from "../../components/DashboardStats";
import SaleSummary from "../../components/SaleSummary";
import TopProductsTable from "../../components/TopProductsTable";
import VendorSidebar from "../../components/VendorSidebar";


const VendorDashboard = () => {
  return (
    <div>
      <VendorSidebar/>
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