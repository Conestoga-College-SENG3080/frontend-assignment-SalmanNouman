import { useEffect, useState } from "react";
import { getPostsByForum, type PostDto } from "../services/api";
import { PostItem } from "./PostItem";
import { useFavorites } from "../hooks/useFavorites";

interface PostListProps {
  token: string;
  forumSlug: string;
}

export const PostList = ({ token, forumSlug }: PostListProps) => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPostsByForum(token, forumSlug, "hot", 10);
        setPosts(data);
      } catch (err) {
        console.error("Fetch posts error:", err);
        setError("Failed to load posts for this forum.");
      } finally {
        setLoading(false);
      }
    };

    if (forumSlug) {
      fetchPosts();
    }
  }, [token, forumSlug]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Top Posts in r/{forumSlug}</h3>
      {posts.length === 0 ? (
        <p>No posts found in this forum.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            isFavorite={isFavorite(post.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))
      )}
    </div>
  );
};
