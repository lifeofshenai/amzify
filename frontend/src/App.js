import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin"; 
import VendorLayout from "./layouts/vendor";
// Admin Pages
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AddVendor from "./pages/admin/AddVendorForm";



// Vendor Pages
import VendorDashboard from "./pages/vendor/Dashboard";
import Products from "./pages/vendor/Products";

// Main Site Pages
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="vendor" element={<VendorManagement />} />
        <Route path="vendor/add-vendor" element={<AddVendor />} />{" "}
      </Route>

      {/* Vendor Routes */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<Products />} />
      </Route>



      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
