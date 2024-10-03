import {Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/admin";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// Admin Pages
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AddVendor from "./pages/admin/AddVendorForm";
import ViewVendorProfile from "./pages/admin/VendorProfile";

// Vendor Pages
// import VendorDashboard from "./pages/vendor/Dashboard";
import Products from "./pages/vendor/Products";
import AddNewProduct from "./pages/vendor/AddNewproduct";
// import VendorDashboard from "./pages/vendor/VendorDashboard";


// Public Pages
import LoginPage from "./pages/LoginPage";

// vendor layout
import VendorLayout from "./layouts/vendor";
// import VendorDashboard from "./pages/vendor/Dashboard";
// import Products from "./pages/vendor/Products";

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="vendor" element={<VendorManagement />} />
        <Route path="vendor/add-vendor" element={<AddVendor />} />
        <Route
          path="vendor-profile/:vendorId"
          element={<ViewVendorProfile />}
        />
      </Route>
      
      {/* Vendor Routes */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes under VendorLayout */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddNewProduct />} />
        </Route>

      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
