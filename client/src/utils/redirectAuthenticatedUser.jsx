import { useAuthStore } from "../store/authStore.js";
import { Navigate } from "react-router-dom";

export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};
 