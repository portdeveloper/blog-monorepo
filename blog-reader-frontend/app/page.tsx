"use client";
import { BlogPost } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [blogposts, setBlogposts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogposts")
      .then((res) => res.json())
      .then((data) => setBlogposts(data));
  }, []);

  return (
    <div className="prose prose-lg mx-auto p-4 space-y-6">
      {blogposts.map((blogpost) => (
        <article key={blogpost._id} className="space-y-4">
          <Link href={`/blogposts/${blogpost._id}`} className="no-underline">
            <h2 className="cursor-pointer">{blogpost.title}</h2>
          </Link>
          <p>{blogpost.content}</p>
          <p className="text-gray-500 text-sm">
            - {new Date(blogpost.timestamp).toLocaleString()}
          </p>
        </article>
      ))}
    </div>
  );
}
