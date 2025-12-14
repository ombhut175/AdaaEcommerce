import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector(state => state.user);

  if (!user || !user.role) {
    return <Navigate to="/signIn" replace />;
  }

  const hasAccess = user.role.some(role => allowedRoles.includes(role.toLowerCase()));

  return hasAccess ? children : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
