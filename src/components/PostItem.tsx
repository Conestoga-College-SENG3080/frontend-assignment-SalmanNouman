import { type PostDto } from "../services/api";

interface PostItemProps {
  post: PostDto;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PostItem = ({ post, isFavorite, onToggleFavorite }: PostItemProps) => {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 hover:border-gray-400 transition-colors p-4 flex gap-4">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            Posted by <span className="hover:underline cursor-pointer">u/{post.author}</span>
          </div>
          <button
            onClick={() => onToggleFavorite(post.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              isFavorite
                ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
            }`}
          >
            <span className={isFavorite ? "text-yellow-500 text-lg" : "text-gray-400 text-lg"}>
              {isFavorite ? "★" : "☆"}
            </span>
            {isFavorite ? "Favorited" : "Favorite"}
          </button>
        </div>

        <h4 className="text-lg font-bold text-gray-900 leading-tight">{post.title}</h4>
        
        <div className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed py-1 line-clamp-6">
          {post.content}
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-bold">
          <div className="flex items-center gap-1 p-1">
            👍 {post.totalLikes.toLocaleString()} likes
          </div>
          <div className="flex items-center gap-1 p-1">
            👁️ {post.totalRead.toLocaleString()} reads
          </div>
        </div>
      </div>
    </div>
  );
};
