import {Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/admin";

// Admin Pages
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AddVendor from "./pages/admin/AddVendorForm";

// Main Site Pages
import LoginPage from "./pages/LoginPage";

// vendor layout
import VendorLayout from "./layouts/vendor";
import VendorDashboard from "./pages/vendor/Dashboard";
import Products from "./pages/vendor/Products";
import Orders from "./pages/vendor/Orders";

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
      {/* Vendor Routes Section */}

      <Route path="/vendor" element={<VendorLayout />}>
        {/* Nested routes under VendorLayout */}
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
