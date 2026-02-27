import { useState, useEffect } from "react";
import { login, type LoginResponse } from "./services/api";
import { Header } from "./components/Header";
import { ForumSelector } from "./components/ForumSelector";
import { PostList } from "./components/PostList";

function App() {
  const [auth, setAuth] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedForum, setSelectedForum] = useState<string | null>(null);

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
          {!selectedForum ? (
            <ForumSelector
              token={auth.access_token}
              onSelectForum={(slug) => setSelectedForum(slug)}
            />
          ) : (
            <div>
              <button onClick={() => setSelectedForum(null)}>← Back to Search</button>
              <PostList token={auth.access_token} forumSlug={selectedForum} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
