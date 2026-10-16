import { useAuth } from "../Contexts/AuthContext";
import Login from "../Pages/Login/Login";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Login />;
}
