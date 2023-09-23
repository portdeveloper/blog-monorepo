import { BlogPost } from "@/utils/types";
import { FormEvent, useState } from "react";

interface BlogpostFormProps {
  setBlogposts: (posts: BlogPost[]) => void;
  blogposts: BlogPost[];
  setError: (error: string | null) => void;
}

export function BlogpostForm({
  setBlogposts,
  blogposts,
  setError,
}: BlogpostFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw Error(`Error: ${res.statusText}`);
      }

      const newPost: BlogPost = await res.json();
      setBlogposts([newPost, ...blogposts]);
      setTitle("");
      setContent("");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow-md my-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
            placeholder="Enter content"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-500 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Blogpost
        </button>
      </form>
    </div>
  );
}
