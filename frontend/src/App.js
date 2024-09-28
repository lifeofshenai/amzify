import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Nested routes under AdminLayout */}
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;
