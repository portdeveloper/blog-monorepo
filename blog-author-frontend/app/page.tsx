"use client";
import { Blogposts } from "@/components/Blogposts";
import Login from "@/components/Login";
import { BlogPost } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [blogposts, setBlogposts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const token = localStorage.getItem("token");
      if (token) setIsLoggedIn(true);
      try {
        const res = await fetch("http://localhost:5000/blogposts/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw Error(`Error: ${res.statusText}`);
        }
        const data: BlogPost[] = await res.json();
        setBlogposts(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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

  if (loading) {
    return <p className="text-lg text-gray-500">Loading...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Blog Author Frontend</h1>
        <p className="text-gray-600 mb-6">
          Please login to view and add blogposts
        </p>
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Author Frontend</h1>
      <p className="text-gray-600 mb-6">Generated by create next app</p>

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

      {loading && <p className="text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Blogposts blogposts={blogposts} />
    </div>
  );
}
