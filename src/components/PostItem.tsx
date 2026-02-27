import { type PostDto } from "../services/api";

interface PostItemProps {
  post: PostDto;
}

export const PostItem = ({ post }: PostItemProps) => {
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
      <h4 style={{ marginTop: 0 }}>{post.title}</h4>
      <p style={{ color: "#555", fontSize: "0.9rem" }}>
        By <strong>u/{post.author}</strong> | {post.totalLikes} likes
      </p>
      <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
    </div>
  );
};
