import { useState, useEffect } from "react";
import { login, type LoginResponse } from "../services/api";

export const useAuth = () => {
  const [auth, setAuth] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded credentials as per discussed in class
    const USERNAME = "snouman0011";
    const PASSWORD = "8861331";

    const performLogin = async () => {
      setLoading(true);
      try {
        const data = await login(USERNAME, PASSWORD);
        setAuth(data);
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to authenticate with Creddit API");
      } finally {
        setLoading(false);
      }
    };

    performLogin();
  }, []);

  return { auth, error, loading };
};
