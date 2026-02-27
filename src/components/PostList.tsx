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
