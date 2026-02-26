import { useState, useEffect } from "react";
import { login, type LoginResponse } from "./services/api";
import { Header } from "./components/Header";

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
      {auth && <Header token={auth.access_token} />}
      {!auth && !error && <p>Authenticating...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {auth && (
        <div style={{ padding: "0 20px" }}>
          <p>Logged in as {auth.user.username}</p>
          <p>Forum content placeholder.</p>
        </div>
      )}
    </div>
  );
}

export default App;
