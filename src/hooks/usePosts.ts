/**
 * @file usePosts.ts
 * @author Salman Nouman
 * @date 2026-02-27
 * @description Custom hook that fetches posts by forum slug or post IDs, managing posts state, loading, and error handling.
 */

import { useState, useEffect } from "react";
import { getPostsByForum, getPostsByIds, type PostDto } from "../services/api";

/**
 * @function usePosts
 * @description Custom hook that fetches posts either by forum slug or by an array of post IDs, managing posts state with loading and error handling.
 * @param {string} token - Authentication token for API requests.
 * @param {string} [slug] - Optional forum slug to fetch posts from a specific forum.
 * @param {string[]} [ids] - Optional array of post IDs to fetch specific posts.
 * @returns {{posts: PostDto[], loading: boolean, error: string | null}} Posts state including array of posts, loading status, and error message.
 */
export const usePosts = (token: string, slug?: string, ids?: string[]) => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * @function fetchPosts
     * @description Fetches posts either by forum slug or post IDs and updates state.
     * @returns {Promise<void>}
     */
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data: PostDto[] = [];
        if (slug) {
          data = await getPostsByForum(token, slug);
        } else if (ids && ids.length > 0) {
          data = await getPostsByIds(token, ids);
        } else if (ids && ids.length === 0) {
          data = [];
        }
        setPosts(data);
      } catch (err) {
        console.error("Fetch posts error:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    if (token && (slug || ids)) {
      fetchPosts();
    }
  }, [token, slug, ids]);

  return { posts, loading, error };
};
