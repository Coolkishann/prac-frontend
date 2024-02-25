import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Open = ({ allBlogs }) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [pages, setpages] = useState({
    subject: "",
    blogHead: "",
    blogData: "",
  });

  useEffect(() => {
    // Find the blog with the given id
    const selectedBlog = allBlogs.find((blog) => blog._id === id);
    if (selectedBlog) {
      setpages(selectedBlog);
    }
  }, [id, allBlogs]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pages.blogData);
    toast.success("Text copied to clipboard");
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
        value={pages.subject}
        onChange={(e) => setpages({ ...pages, subject: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
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
        value={pages.blogHead}
        onChange={(e) => setpages({ ...pages, blogHead: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <label
        htmlFor="blogData"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Blog Data:
      </label>
      <div className="relative">
        <textarea
          id="blogData"
          name="blogData"
          rows="20"
          cols="50"
          value={pages.blogData}
          onChange={(e) => setpages({ ...pages, blogData: e.target.value })}
          className="w-full area p-2 border border-gray-300 rounded mb-4"
          required
        ></textarea>
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Open;
