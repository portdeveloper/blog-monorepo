import { BlogPost } from "@/utils/types";

export function Blogposts({ blogposts }: { blogposts: BlogPost[] }) {
  return (
    <ul className="space-y-4">
      {blogposts &&
        blogposts.map((post) => (
          <li key={post._id} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 text-sm">
              - {new Date(post.timestamp).toLocaleString()}
            </p>
            <div>
              {post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-100 p-4 my-2">
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-gray-500 text-sm"> - {comment.name}</p>
                  <p className="text-gray-500 text-sm">{comment.timestamp}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
    </ul>
  );
}
