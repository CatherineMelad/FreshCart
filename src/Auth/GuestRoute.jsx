import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function GuestRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}