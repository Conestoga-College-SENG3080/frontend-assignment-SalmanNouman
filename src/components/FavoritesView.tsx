import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./PostItem";
import { useFavorites } from "../hooks/useFavorites";

interface FavoritesViewProps {
  token: string;
}

export const FavoritesView = ({ token }: FavoritesViewProps) => {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { posts, loading, error } = usePosts(token, undefined, favoriteIds);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded shadow-sm border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded text-center font-medium shadow-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.length === 0 ? (
        <div className="bg-white p-16 rounded shadow-sm border border-gray-200 text-center flex flex-col items-center gap-4">
          <div className="text-4xl">☆</div>
          <p className="text-gray-500 font-medium">You haven't favorited any posts yet.</p>
          <p className="text-xs text-gray-400">Save posts while browsing forums to see them here.</p>
        </div>
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
