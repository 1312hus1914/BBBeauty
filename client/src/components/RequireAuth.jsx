// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const RequireAuth = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    // redirect to login and remember where we came from
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
