import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, tokenName, redirectTo }) {
  const token = localStorage.getItem(tokenName);

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;