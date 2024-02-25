import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditBlog = ({ allBlogs }) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [editedBlog, setEditedBlog] = useState({
    subject: "",
    blogHead: "",
    blogData: "",
  });

  useEffect(() => {
    // Find the blog with the given id
    const selectedBlog = allBlogs.find((blog) => blog._id === id);
    if (selectedBlog) {
      setEditedBlog(selectedBlog);
    }
  }, [id, allBlogs]);

  const updateSelectedBlog = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/blogs/${id}`,
        editedBlog
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully");
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({
      ...editedBlog,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Subject:
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={editedBlog.subject}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label
        htmlFor="blogHead"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Blog Head:
      </label>
      <input
        type="text"
        id="blogHead"
        name="blogHead"
        value={editedBlog.blogHead}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label
        htmlFor="blogData"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Blog Data:
      </label>
      <textarea
        id="blogData"
        name="blogData"
        rows="4"
        cols="50"
        value={editedBlog.blogData}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      ></textarea>
      <button
        onClick={updateSelectedBlog}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
