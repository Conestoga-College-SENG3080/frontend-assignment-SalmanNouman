import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./PostItem";
import { useFavorites } from "../hooks/useFavorites";

interface PostListProps {
  token: string;
  forumSlug: string;
}

export const PostList = ({ token, forumSlug }: PostListProps) => {
  const { posts, loading, error } = usePosts(token, forumSlug);
  const { isFavorite, toggleFavorite } = useFavorites();

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
        <div className="bg-white p-12 rounded shadow-sm border border-gray-200 text-center flex flex-col items-center gap-4">
          <span className="text-4xl text-gray-300 italic opacity-50">Nothing here...</span>
          <p className="text-gray-500 font-medium">No posts found in this forum.</p>
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
