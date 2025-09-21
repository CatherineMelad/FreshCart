import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  function verifyToken(token) {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: { token }, // ✅ fixed header
      })
      .then((res) => {
        setIsLoggedIn(true);
        setUserId(res.data.decoded.id);
      })
      .catch(() => {
        // remove token only if backend rejects it
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, userId }}>
      {children}
    </authContext.Provider>
  );
}