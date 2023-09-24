import { BlogPost, Comment } from "@/utils/types";
import { useState } from "react";

export default function Comments({ blogpost }: { blogpost: BlogPost }) {
  const [comments, setComments] = useState<Comment[]>(blogpost.comments);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/blogposts/${blogpost._id}/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-4 my-2">
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-gray-500 text-sm"> - {comment.name}</p>
          <p className="text-gray-500 text-sm">{comment.timestamp}</p>
          <button
            className="btn btn-xs btn-error"
            onClick={() => handleDelete(comment._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
