// src/components/RequireAdmin.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const RequireAdmin = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    // logged in but not admin → send home (or a "no access" page)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
