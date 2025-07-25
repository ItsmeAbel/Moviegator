import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//protects some routes so only logged in users can access them
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
