import { useEffect, useState } from "react";
import { getPostsByIds, type PostDto } from "../services/api";
import { PostItem } from "./PostItem";
import { useFavorites } from "../hooks/useFavorites";

interface FavoritesViewProps {
  token: string;
}

export const FavoritesView = ({ token }: FavoritesViewProps) => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      if (favoriteIds.length === 0) {
        setPosts([]);
        return;
      }

      setLoading(true);
      try {
        const data = await getPostsByIds(token, favoriteIds);
        setPosts(data);
      } catch (err) {
        console.error("Fetch favorite posts error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, [token, favoriteIds]);

  if (loading) return <p>Loading your favorites...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Favorite Posts</h3>
      {posts.length === 0 ? (
        <p>You haven't favorited any posts yet.</p>
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
