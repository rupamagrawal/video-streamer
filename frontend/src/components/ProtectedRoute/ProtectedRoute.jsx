import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
