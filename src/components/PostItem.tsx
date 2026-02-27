import { type PostDto } from "../services/api";

interface PostItemProps {
  post: PostDto;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PostItem = ({ post, isFavorite, onToggleFavorite }: PostItemProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4 style={{ marginTop: 0 }}>{post.title}</h4>
        <button
          onClick={() => onToggleFavorite(post.id)}
          style={{
            background: isFavorite ? "#ffd700" : "#eee",
            border: "1px solid #ccc",
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
      <p style={{ color: "#555", fontSize: "0.9rem" }}>
        By <strong>u/{post.author}</strong> | {post.totalLikes} likes
      </p>
      <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
    </div>
  );
};
