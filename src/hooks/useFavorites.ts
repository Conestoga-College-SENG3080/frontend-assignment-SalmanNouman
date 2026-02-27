import { useState, useEffect } from "react";

const STORAGE_KEY = "creddit_favorites";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavoriteIds(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse favorites from storage:", err);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favoriteIds.includes(id)
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];

    setFavoriteIds(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return { favoriteIds, toggleFavorite, isFavorite };
};
