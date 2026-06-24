import React, { useState } from "react";

const PostForm = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Math");

  const categories = ["Math", "History", "Science", "IT"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      content,
      category,
      date: new Date(), // Store the current date/time when the post is created
    };

    setPosts((prev) => [...prev, newPost]);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Create a Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
