import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

const authContext = createContext(null);

export function useAuth() {
  const ctx = useContext(authContext);
  if (!ctx)
    throw new Error("useAuth must be used inside <AuthContextProvider>");
  return ctx;
}

function decodeUserId(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).id ?? "";
  } catch {
    return "";
  }
}

export default function AuthContextProvider({ children }) {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/auth/verifyToken")
      .then((res) => {
        setIsLoggedIn(true);
        setUserId(res.data.decoded.id);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setUserId(decodeUserId(token));
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({ isLoggedIn, isLoading, userId, login, logout }),
    [isLoggedIn, isLoading, userId, login, logout],
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
