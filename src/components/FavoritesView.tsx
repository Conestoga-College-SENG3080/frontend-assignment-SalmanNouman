import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./PostItem";
import { useFavorites } from "../hooks/useFavorites";

interface FavoritesViewProps {
  token: string;
}

export const FavoritesView = ({ token }: FavoritesViewProps) => {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { posts, loading, error } = usePosts(token, undefined, favoriteIds);

  if (loading) return <p>Loading your favorites...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
