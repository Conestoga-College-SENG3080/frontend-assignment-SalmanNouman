/**
 * @file App.tsx
 * @author Salman Nouman
 * @date 2026-02-26
 * @description Main application component that handles authentication, navigation between forums and favorites views, and renders the overall layout including header, sidebar, and content areas.
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { ForumSelector } from "./components/ForumSelector";
import { PostList } from "./components/PostList";
import { FavoritesView } from "./components/FavoritesView";
import { useAuth } from "./hooks/useAuth";
import "./index.css";

const POPULAR_FORUMS = ["funny", "todayilearned", "news", "worldnews", "gaming", "pics", "science", "movies", "music", "videos"];

/**
 * @function App
 * @description Renders the main application layout with authentication state handling, navigation between explore and favorites tabs, forum selection, and post display.
 * @returns {JSX.Element | null} The main application UI or null if not authenticated.
 */
function App() {
  const { auth, error, loading } = useAuth();
  const [selectedForum, setSelectedForum] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<"explore" | "favorites">("explore");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600 font-medium">Authenticating with Creddit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <p className="text-sm text-gray-500">Please check your credentials in your useAuth.ts hook.</p>
        </div>
      </div>
    );
  }

  if (!auth) return null;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
      <Header token={auth.access_token} />

      <main className="flex flex-col md:flex-row max-w-6xl mx-auto w-full px-4 py-6 gap-6 grow">
        {/* Sidebar / Left Column */}
        <aside className="w-full md:w-64 flex flex-col gap-6 order-2 md:order-1">
          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 bg-blue-500 text-white font-bold text-sm uppercase">Navigation</div>
            <div className="flex flex-col">
              <button
                onClick={() => setCurrentTab("explore")}
                className={`p-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${currentTab === "explore" ? "border-orange-500 bg-blue-50 text-blue-600 font-bold" : "border-transparent text-gray-700"}`}
              >
                Explore Forums
              </button>
              <button
                onClick={() => setCurrentTab("favorites")}
                className={`p-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${currentTab === "favorites" ? "border-orange-500 bg-blue-50 text-blue-600 font-bold" : "border-transparent text-gray-700"}`}
              >
                Your Favorites
              </button>
            </div>
          </div>

          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-xs uppercase text-gray-500">Popular Communities</div>
            <div className="flex flex-col">
              {POPULAR_FORUMS.map((slug) => (
                <button
                  key={slug}
                  onClick={() => {
                    setSelectedForum(slug);
                    setCurrentTab("explore");
                  }}
                  className={`p-2 text-left hover:bg-gray-50 transition-colors text-sm ${selectedForum === slug && currentTab === "explore" ? "text-blue-600 font-bold bg-blue-50" : "text-gray-800"}`}
                >
                  r/{slug}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area / Middle Column */}
        <section className="flex-1 order-1 md:order-2 flex flex-col gap-4">
          {currentTab === "explore" ? (
            !selectedForum ? (
              <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <ForumSelector
                  token={auth.access_token}
                  onSelectForum={(slug) => setSelectedForum(slug)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="bg-white p-3 rounded shadow-sm border border-gray-200 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedForum(null)}
                    className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    ← Back to Search
                  </button>
                  <span className="text-gray-400">/</span>
                  <h2 className="text-lg font-bold">r/{selectedForum}</h2>
                </div>
                <PostList token={auth.access_token} forumSlug={selectedForum} />
              </div>
            )
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold px-1">Your Favorites</h2>
              </div>
              <FavoritesView token={auth.access_token} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
