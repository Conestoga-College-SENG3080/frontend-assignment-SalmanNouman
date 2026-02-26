import { useState, useEffect } from "react";
import { login, type LoginResponse } from "./services/api";

function App() {
  const [auth, setAuth] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hardcoded credentials as per discussed in class
    const USERNAME = "snouman0011";
    const PASSWORD = "8861331";

    const performLogin = async () => {
      try {
        console.log("Attempting login for:", USERNAME);
        const data = await login(USERNAME, PASSWORD);
        setAuth(data);
        console.log("Login successful, token received");
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to authenticate with Creddit API");
      }
    };

    performLogin();
  }, []);

  return (
    <div className="app-container">
      <h1>Creddit App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {auth ? (
        <div>
          <p>Authenticated! Token: {auth.access_token.substring(0, 10)}...</p>
          <p>Check console for more details.</p>
        </div>
      ) : (
        <p>Authenticating...</p>
      )}
    </div>
  );
}

export default App;
