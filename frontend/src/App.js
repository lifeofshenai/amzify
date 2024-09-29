import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin"; // Admin Layout
import MainLayout from "./layouts/auth"; // Main Site Layout


// Admin Pages
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";

// Main Site Pages
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* Default to Dashboard */}
        <Route path="analytics" element={<Analytics />} />{" "}
        {/* /admin/analytics */}
        {/* Add more admin-specific routes here */}
      </Route>

      {/* Main Site Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
