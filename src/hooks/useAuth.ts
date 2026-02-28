/**
 * @file useAuth.ts
 * @author Salman Nouman
 * @date 2026-02-27
 * @description Custom hook that handles authentication with hardcoded credentials, managing auth state, loading, and error states.
 */

import { useState, useEffect } from "react";
import { login, type LoginResponse } from "../services/api";

/**
 * @function useAuth
 * @description Custom hook that performs login on mount with hardcoded credentials and returns authentication state.
 * @returns {{auth: LoginResponse | null, error: string | null, loading: boolean}} Authentication state including token, error message, and loading status.
 */
export const useAuth = () => {
  const [auth, setAuth] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded credentials as per discussed in class
    const USERNAME = "snouman0011";
    const PASSWORD = "8861331";

    /**
     * @function performLogin
     * @description Asynchronous function that performs login with hardcoded credentials and updates state accordingly.
     * @returns {Promise<void>}
     */
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
