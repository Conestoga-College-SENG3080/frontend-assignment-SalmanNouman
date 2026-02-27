import { useState } from "react";
import { searchForums, type ForumDto } from "../services/api";

export const useForums = (token: string) => {
  const [results, setResults] = useState<ForumDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (query.length < 3) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchForums(token, query);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search forums.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};
