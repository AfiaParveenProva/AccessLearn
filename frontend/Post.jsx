import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Category: {post.category}</small>
    </div>
  );
};

export default Post;
