import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // Ambil data blog dari server
  useEffect(() => {
    axios.get("/api/blogs").then((response) => setBlogs(response.data));
  }, []);

  // Tangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kirim data ke server
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/blogs", formData)
      .then(() => {
        alert("Blog created successfully!");
        setFormData({ title: "", content: "" });
        axios.get("/api/blogs").then((response) => setBlogs(response.data));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Manage Blogs</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Blog</button>
      </form>

      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong>: {blog.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogManager;
