import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin"; 

// Admin Pages
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AddVendor from "./pages/admin/AddVendorForm";



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

      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
