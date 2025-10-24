import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

export default PrivateRoute;
