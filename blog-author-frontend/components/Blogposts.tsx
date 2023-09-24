import { BlogPost } from "@/utils/types";
import { useState } from "react";
import Comments from "./Comments";

export function Blogposts({
  blogposts,
  setBlogposts,
  setError,
}: {
  blogposts: BlogPost[];
  setBlogposts: Function;
  setError: Function;
}) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>("");

  const handleUpdate = async (blogpost: BlogPost) => {
    const published = blogpost.published;
    try {
      const res = await fetch(
        `http://localhost:5000/blogposts/${blogpost._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: updatedContent, published }),
        }
      );

      if (!res.ok) {
        throw Error(`Error: ${res.statusText}`);
      }

      const updatedPost: BlogPost = await res.json();
      setBlogposts(
        blogposts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
      setEditingPost(null);
      setUpdatedContent("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/blogposts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw Error(`Error: ${res.statusText}`);
      }

      setBlogposts(blogposts.filter((post) => post._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleTogglePublished = async (e: any, blogpost: BlogPost) => {
    console.log(e);

    const published = e.target.checked;
    try {
      const res = await fetch(
        `http://localhost:5000/blogposts/${blogpost._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ published }),
        }
      );

      if (!res.ok) {
        throw Error(`Error: ${res.statusText}`);
      }

      const updatedPost: BlogPost = await res.json();
      setBlogposts(
        blogposts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ul className="space-y-4">
      {blogposts &&
        blogposts.map((blogpost) => (
          <li
            key={blogpost._id}
            className="bg-white p-6 rounded shadow-md flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semi bold mb-2">{blogpost.title}</h2>
              <div className="flex gap-2">
                <p className="text-gray-500 text-sm">published? </p>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={blogpost.published}
                  onChange={(e) => handleTogglePublished(e, blogpost)}
                />
              </div>
            </div>
            {editingPost && editingPost._id === blogpost._id ? (
              <div>
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  className="textarea w-full h-72"
                />
                <button
                  className="btn btn-success btn-xs"
                  onClick={() => handleUpdate(blogpost)}
                >
                  Update
                </button>
              </div>
            ) : (
              <p className="text-gray-700">{blogpost.content}</p>
            )}
            <p className="text-gray-500 text-sm">
              - {new Date(blogpost.timestamp).toLocaleString()}
            </p>
            <div className="self-end flex gap-1">
              {editingPost?._id === blogpost._id ? (
                <button
                  className="btn btn-error btn-xs"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingPost(blogpost);
                    setUpdatedContent(blogpost.content);
                  }}
                  className="btn btn-warning btn-xs"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(blogpost._id)}
                className="btn btn-error btn-xs"
              >
                Delete
              </button>
            </div>
            <Comments blogpost={blogpost} />
          </li>
        ))}
    </ul>
  );
}
