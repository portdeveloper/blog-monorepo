"use client";
import { BlogPost } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogposts, setBlogposts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogposts")
      .then((res) => res.json())
      .then((data) => setBlogposts(data));
  }, []);

  return (
    <div>
      {blogposts.map((blogpost) => (
        <div key={blogpost._id}>
          <h2>{blogpost.title}</h2>
          <p>{blogpost.content}</p>
          <p className="text-gray-500 text-sm">
            - {new Date(blogpost.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
