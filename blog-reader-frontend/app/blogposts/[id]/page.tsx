import CommentForm from "@/components/CommentForm";
import { BlogPost, Comment } from "@/utils/types";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:5000/blogposts/${params.id}/`);
  const blogpost: BlogPost = await res.json();

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
          <CommentForm blogpostId={blogpost._id} />
        </div>
      </article>
    </div>
  );
}
