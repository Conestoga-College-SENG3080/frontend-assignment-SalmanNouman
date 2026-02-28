/**
 * @file useForums.ts
 * @author Salman Nouman
 * @date 2026-02-27
 * @description Custom hook that manages forum search functionality, including search state, results, loading, error handling, and clearing results.
 */

import { useState } from "react";
import { searchForums, type ForumDto } from "../services/api";

/**
 * @function useForums
 * @description Custom hook that provides forum search functionality with state management for results, loading, errors, and search history.
 * @param {string} token - Authentication token for API requests.
 * @returns {{results: ForumDto[], loading: boolean, error: string | null, search: function, hasSearched: boolean, clearResults: function}} Forum search state and functions.
 */
export const useForums = (token: string) => {
  const [results, setResults] = useState<ForumDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * @function search
   * @description Searches for forums matching the query with minimum 3 characters, updating loading, error, and results state.
   * @param {string} query - Search query for forums.
   * @returns {Promise<void>}
   */
  const search = async (query: string) => {
    if (query.length < 3) return;

    setLoading(true);
    setError(null);
    setHasSearched(false);
    try {
      const data = await searchForums(token, query);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search forums.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function clearResults
   * @description Clears search results and resets search state.
   * @returns {void}
   */
  const clearResults = () => {
    setResults([]);
    setHasSearched(false);
  };

  return { results, loading, error, search, hasSearched, clearResults };
};
