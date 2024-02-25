// import React, { useState } from "react";
// import axios from "axios"; // Add this line
// import toast from "react-hot-toast";
// import { NavLink } from "react-router-dom";

// const BlogList = ({ allBlogs, setAllBlogs, setSelectedBlog }) => {
//   const [filterSubject, setFilterSubject] = useState(""); // State for selected subject filter

//   const deleteSelectedBlog = async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3001/api/blogs/${id}`
//       );

//       if (response.status === 200) {
//         setAllBlogs(allBlogs.filter((blog) => blog._id !== id));
//         toast.success("Blog deleted successfully");
//       } else {
//         toast.error("Failed to delete blog");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Filter blogs by subject
//   const filteredBlogs = filterSubject
//     ? allBlogs.filter((blog) => blog.subject === filterSubject)
//     : allBlogs;

//   return (
//     <>
//       <NavLink to="/">
//         <button className="bg-blue-500 ml-8 text-white px-4 py-2 rounded">
//           Back
//         </button>
//       </NavLink>
//       <div className="mt-8">
//         {/* Filter dropdown */}
//         <select
//           value={filterSubject}
//           onChange={(e) => setFilterSubject(e.target.value)}
//           className="p-2 border border-gray-300 rounded mb-4"
//         >
//           <option value="">Select Subject : All</option>
//           <option value="IoT">IoT</option>
//           <option value="TOC">TOC</option>
//           <option value="SE">SE</option>
//           <option value="RM">RM</option>
//           <option value="DSA">DSA</option>
//         </select>
//       </div>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredBlogs.map((blog) => (
//           <div key={blog._id} className="bg-white p-6 rounded-md shadow-md">
//             <p>
//               <strong>Subject:</strong> {blog.subject} <br />
//               <strong>Blog Head:</strong> {blog.blogHead} <br />
//               <strong>Blog Data:</strong> {blog.blogData}
//             </p>
//             <button
//               onClick={() => setSelectedBlog(blog)}
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteSelectedBlog(blog._id)}
//               className="bg-red-500 ml-8 text-white px-4 py-2 rounded mt-2"
//             >
//               Delete Blog
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default BlogList;

import React, { useState } from "react";
import axios from "axios"; // Add this line
import toast from "react-hot-toast";
import { NavLink, Link } from "react-router-dom"; // Import Link

const BlogList = ({ allBlogs, setAllBlogs, setSelectedBlog }) => {
  const [filterSubject, setFilterSubject] = useState(""); // State for selected subject filter

  // const deleteSelectedBlog = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/api/blogs/${id}`
  //     );

  //     if (response.status === 200) {
  //       setAllBlogs(allBlogs.filter((blog) => blog._id !== id));
  //       toast.success("Blog deleted successfully");
  //     } else {
  //       toast.error("Failed to delete blog");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // Filter blogs by subject
  const filteredBlogs = filterSubject
    ? allBlogs.filter((blog) => blog.subject === filterSubject)
    : allBlogs;

  return (
    <>
      <NavLink to="/">
        <button className="bg-blue-500 ml-8 text-white px-4 py-2 rounded">
          Back
        </button>
      </NavLink>
      <div className="mt-8">
        {/* Filter dropdown */}
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Subject : All</option>
          <option value="IoT">IoT</option>
          <option value="TOC">TOC</option>
          <option value="SE">SE</option>
          <option value="RM">RM</option>
          <option value="DSA">DSA</option>
        </select>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Link to={`/blogs/${blog._id}`}>
            <div
              key={blog._id}
              className="bg-white relative p-6 rounded-md shadow-md"
            >
              <p>
                <strong>Subject:</strong> {blog.subject} <br />
                <strong>Blog Head:</strong> {blog.blogHead} <br />
                <strong>Blog Data:</strong>{" "}
                {blog.blogData.length > 35
                  ? blog.blogData.substring(0, 35) + "......"
                  : blog.blogData}
              </p>
              <Link
                to={`/blogs/${blog._id}/edit`}
                className="bg-blue-500 top-2 right-2 text-white px-4 py-2 absolute mt-1  rounded "
              >
                Edit
              </Link>
              {/* <button
                onClick={() => deleteSelectedBlog(blog._id)}
                className="bg-red-500 ml-8 text-white px-4 py-2 rounded mt-2"
              >
                Delete Blog
              </button> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogList;
