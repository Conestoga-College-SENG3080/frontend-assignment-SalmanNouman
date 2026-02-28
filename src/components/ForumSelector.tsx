import { useState, useEffect } from "react";
import { useForums } from "../hooks/useForums";

interface ForumSelectorProps {
  token: string;
  onSelectForum: (slug: string) => void;
}

export const ForumSelector = ({ token, onSelectForum }: ForumSelectorProps) => {
  const [query, setQuery] = useState("");
  const { results, loading, error, search, hasSearched, clearResults } =
    useForums(token);

  // Clear results if the user changes the query
  useEffect(() => {
    if (query.length < 3 && hasSearched) {
      clearResults();
    }
  }, [query, hasSearched, clearResults]);

  const handleSearch: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-900">Find a Forum</h3>
        <p className="text-sm text-gray-600">Explore communities on Creddit.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. funny, news..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || query.length < 3}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex items-center gap-2 text-blue-600 font-medium">
            <span className="animate-bounce text-xs">●</span>
            <span className="animate-bounce delay-75 text-xs">●</span>
            <span className="animate-bounce delay-150 text-xs">●</span>
            Searching...
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded text-sm text-center">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">
            Results
          </h4>
          <ul className="flex flex-col gap-2">
            {results.map((forum) => (
              <li key={forum.id}>
                <button
                  onClick={() => onSelectForum(forum.slug)}
                  className="w-full group text-left p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 flex items-center gap-3 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-200 transition-colors">
                    r/
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors">
                      r/{forum.slug}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {forum.description}
                    </span>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-500">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* show no results if a search was actually completed and returned 0 results */}
      {results.length === 0 && hasSearched && !loading && !error && (
        <div className="bg-gray-50 p-8 rounded text-center text-gray-500 text-sm border border-dashed border-gray-200">
          No forums found matching "<strong>{query}</strong>"
        </div>
      )}
    </div>
  );
};
