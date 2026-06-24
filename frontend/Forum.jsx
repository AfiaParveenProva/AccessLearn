import React, { useState, useEffect } from "react";
import Post from "./Post";
import PostForm from "./PostForm";
import Filter from "./Filter";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setFilteredPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let updatedPosts = [...posts];

    if (searchTerm) {
      updatedPosts = updatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      updatedPosts = updatedPosts.filter((post) => post.category === selectedCategory);
    }

    updatedPosts.sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

    setFilteredPosts(updatedPosts);
  }, [searchTerm, sortOrder, posts, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>

      <div className="filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Pass selectedCategory and handleCategoryChange to the Filter component */}
      <Filter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <PostForm setPosts={setPosts} setFilteredPosts={setFilteredPosts} />

      <div className="post-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
