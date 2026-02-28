/**
 * @file useFavorites.ts
 * @author Salman Nouman
 * @date 2026-02-27
 * @description Custom hook that manages favorite posts persistence using localStorage, providing toggle and check functionality.
 */

import { useState } from "react";

const STORAGE_KEY = "creddit_favorites";

/**
 * @function getInitialFavoriteIds
 * @description Retrieves and validates favorite post IDs from localStorage on initialization.
 * @returns {string[]} Array of valid post IDs from localStorage or empty array on error.
 */
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

/**
 * @function useFavorites
 * @description Custom hook that manages favorite posts with localStorage persistence, providing toggle and check functionality.
 * @returns {{favoriteIds: string[], toggleFavorite: function, isFavorite: function}} Favorite state management with IDs array, toggle function, and check function.
 */
export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getInitialFavoriteIds);

  /**
   * @function toggleFavorite
   * @description Toggles a post's favorite status and updates localStorage.
   * @param {string} id - Post ID to toggle favorite status for.
   * @returns {void}
   */
  const toggleFavorite = (id: string) => {
    setFavoriteIds((previousFavorites) => {
      const newFavorites = previousFavorites.includes(id)
        ? previousFavorites.filter((favId) => favId !== id)
        : [...previousFavorites, id];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  /**
   * @function isFavorite
   * @description Checks if a post is in the favorites list.
   * @param {string} id - Post ID to check.
   * @returns {boolean} True if post is favorited, false otherwise.
   */
  const isFavorite = (id: string) => favoriteIds.includes(id);

  return { favoriteIds, toggleFavorite, isFavorite };
};
