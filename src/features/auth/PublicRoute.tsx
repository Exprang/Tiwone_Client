import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";

const PublicRoute = () => {
  const { isAuthenticated } = useUser();

  // If authenticated, redirect to dashboard (or home)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default PublicRoute;
