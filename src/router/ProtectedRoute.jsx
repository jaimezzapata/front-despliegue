import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return null; // o spinner
  return usuario ? children : <Navigate to="/login" />;
}
