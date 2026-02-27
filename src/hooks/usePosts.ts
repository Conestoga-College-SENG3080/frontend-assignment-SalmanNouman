import { useState, useEffect } from "react";
import { getPostsByForum, getPostsByIds, type PostDto } from "../services/api";

export const usePosts = (token: string, slug?: string, ids?: string[]) => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
