import { useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    // Handle unauthorized access
    if (user && allowedRoles && !allowedRoles.includes(role)) {
      toast.info(
        "Unauthorized - You don't have permission to access this page"
      );
      navigate("/"); // Redirect to dashboard or other fallback page
    }
  }, [user, role, allowedRoles, navigate]);

  // Check if we are still loading user data
  if (loading) {
    return (
      <div className="grid place-items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
