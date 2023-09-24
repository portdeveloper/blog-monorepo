"use client";
import { FormEvent, useState } from "react";

function CommentForm({
  blogpostId,
  onNewComment,
}: {
  blogpostId: string;
  onNewComment: () => void;
}) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/blogposts/${blogpostId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, content }),
        }
      );
      if (!res.ok) {
        throw Error(`Error: ${res.statusText}`);
      }
      onNewComment();

      setName("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col space-y-4 form-control mt-4">
      <div className="flex gap-2 items-center">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          className="input input-sm input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <label htmlFor="comment">Comment</label>

      <textarea
        className="textarea textarea-bordered"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="btn btn-primary btn-xs"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default CommentForm;
