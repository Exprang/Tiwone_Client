import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();

  // If not authenticated, redirect to signin
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return <Outlet />; // render child routes
};

export default PrivateRoute;
