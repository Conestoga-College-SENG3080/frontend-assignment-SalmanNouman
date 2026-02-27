import { useState } from "react";
import { searchForums, type ForumDto } from "../services/api";

interface ForumSelectorProps {
  token: string;
  onSelectForum: (slug: string) => void;
}

export const ForumSelector = ({ token, onSelectForum }: ForumSelectorProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ForumDto[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 3) return;

    setLoading(true);
    try {
      const data = await searchForums(token, query);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}
    >
      <h3>Find a Forum</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. funny, news..."
          style={{ padding: "8px", width: "200px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", marginLeft: "8px" }}
        >
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {results.map((forum) => (
          <li key={forum.id} style={{ marginBottom: "8px" }}>
            <button
              onClick={() => onSelectForum(forum.slug)}
              style={{
                background: "#4800ff",
                border: "1px solid #ffffff",
                padding: "4px 8px",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>r/{forum.slug}</strong> - {forum.description}
            </button>
          </li>
        ))}
      </ul>
      {results.length === 0 && !loading && query.length >= 3 && (
        <p>No forums found for "{query}"</p>
      )}
    </div>
  );
};
