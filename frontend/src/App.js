import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";


// vendor layout
import VendorLayout from "./layouts/vendor";
import VendorDashboard from "./pages/vendor/Dashboard";
import Products from "./pages/vendor/Products";
import Orders from "./pages/vendor/Orders";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Nested routes under AdminLayout */}
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      {/* Vendor Routes Section */}
      
     <Route path="/vendor" element={<VendorLayout />}>
        {/* Nested routes under VendorLayout */}
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
