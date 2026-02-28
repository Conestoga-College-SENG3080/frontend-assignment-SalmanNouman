import { useState } from "react";

const STORAGE_KEY = "creddit_favorites";

const getInitialFavoriteIds = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is string => typeof id === "string");
  } catch (err) {
    console.error("Failed to parse favorites from storage:", err);
    return [];
  }
};

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getInitialFavoriteIds);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previousFavorites) => {
      const newFavorites = previousFavorites.includes(id)
        ? previousFavorites.filter((favId) => favId !== id)
        : [...previousFavorites, id];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return { favoriteIds, toggleFavorite, isFavorite };
};
