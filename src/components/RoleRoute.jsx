import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const userData = localStorage.getItem("book_request_user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;