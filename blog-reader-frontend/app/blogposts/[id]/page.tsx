"use client";
import { useEffect, useState } from "react";
import CommentForm from "@/components/CommentForm";
import { BlogPost, Comment } from "@/utils/types";
import Link from "next/link";

function Page({ params }: { params: { id: string } }) {
  const [blogpost, setBlogpost] = useState<BlogPost | null>(null);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:5000/blogposts/${params.id}/`);
    const data: BlogPost = await res.json();
    setBlogpost(data);
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleNewComment = () => {
    fetchData();
  };

  if (!blogpost) return <div>Loading...</div>;

  return (
    <div className="prose prose-lg mx-auto p-4 space-y-6">
      <Link href="/" className="no-underline">
        <h4 className="cursor-pointer">Back</h4>
      </Link>
      <article className="space-y-4">
        <h2>{blogpost.title}</h2>
        <p>{blogpost.content}</p>
        <p className="text-gray-500 text-sm">
          - {new Date(blogpost.timestamp).toLocaleString()}
        </p>
        <div className="p-4">
          {blogpost.comments.map((comment: Comment) => (
            <div key={comment._id} className="space-y-4">
              <p className="text-sm">{comment.content}</p>
              <p className="text-gray-400 text-xs">
                - {new Date(comment.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          <CommentForm
            blogpostId={blogpost._id}
            onNewComment={handleNewComment}
          />
        </div>
      </article>
    </div>
  );
}

export default Page;
