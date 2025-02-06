// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ role, children }) => {
  // Get the user's roles from your Redux store or context
  const userRoles = useSelector((state) => state.user.roles); // Assuming roles are an array

  // Check if the user has the required role
  const hasAccess = role ? userRoles.includes(role) : true;

  if (hasAccess) {
    return children;
  } else {
    return <Navigate to='/unauthorized' replace />;
  }
};

export default ProtectedRoute;
