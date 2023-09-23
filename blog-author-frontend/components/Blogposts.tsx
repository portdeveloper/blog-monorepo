import { BlogPost } from "@/utils/types";

export function Blogposts({
  blogposts,
  setBlogposts,
  setError,
}: {
  blogposts: BlogPost[];
  setBlogposts: Function;
  setError: Function;
}) {
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

  return (
    <ul className="space-y-4">
      {blogposts &&
        blogposts.map((post) => (
          <li
            key={post._id}
            className="bg-white p-6 rounded shadow-md flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>

            <p className="text-gray-500 text-sm">
              - {new Date(post.timestamp).toLocaleString()}
            </p>
            <div className="self-end flex gap-1">
              <button
                onClick={() => handleDelete(post._id)}
                className="btn btn-error btn-xs"
              >
                Delete
              </button>
            </div>
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
