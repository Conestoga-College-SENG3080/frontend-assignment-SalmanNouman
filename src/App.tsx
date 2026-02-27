import { useState } from "react";
import { Header } from "./components/Header";
import { ForumSelector } from "./components/ForumSelector";
import { PostList } from "./components/PostList";
import { FavoritesView } from "./components/FavoritesView";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { auth, error, loading } = useAuth();
  const [selectedForum, setSelectedForum] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<"explore" | "favorites">("explore");

  if (loading) {
    return <div style={{ padding: "20px" }}>Authenticating...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!auth) return null;

  return (
    <div className="app-container">
      <Header token={auth.access_token} />

      <main style={{ padding: "0 20px" }}>
        {/* Tab Navigation */}
        <nav style={{ marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
          <button
            onClick={() => setCurrentTab("explore")}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: currentTab === "explore" ? "#007bff" : "#fff",
              color: currentTab === "explore" ? "#fff" : "#000",
              border: "1px solid #007bff",
              borderRadius: "4px 0 0 4px",
              fontWeight: currentTab === "explore" ? "bold" : "normal",
            }}
          >
            Explore Forums
          </button>
          <button
            onClick={() => setCurrentTab("favorites")}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: currentTab === "favorites" ? "#007bff" : "#fff",
              color: currentTab === "favorites" ? "#fff" : "#000",
              border: "1px solid #007bff",
              borderRadius: "0 4px 4px 0",
              marginLeft: "-1px",
              fontWeight: currentTab === "favorites" ? "bold" : "normal",
            }}
          >
            Your Favorites
          </button>
        </nav>

        {currentTab === "explore" ? (
          !selectedForum ? (
            <ForumSelector
              token={auth.access_token}
              onSelectForum={(slug) => setSelectedForum(slug)}
            />
          ) : (
            <div>
              <button
                onClick={() => setSelectedForum(null)}
                style={{
                  marginBottom: "20px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                ← Back to Search
              </button>
              <PostList token={auth.access_token} forumSlug={selectedForum} />
            </div>
          )
        ) : (
          <FavoritesView token={auth.access_token} />
        )}
      </main>
    </div>
  );
}

export default App;
