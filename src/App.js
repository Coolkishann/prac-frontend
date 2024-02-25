// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import BlogList from "./component/BlogList";
// import BlogItem from "./component/BlogItem";

// const App = () => {
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState({
//     subject: "",
//     blogHead: "",
//     blogData: "",
//   });

//   useEffect(() => {
//     const fetchAllBlogs = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/blogs");
//         if (response.status === 200) {
//           setAllBlogs(response.data);
//         } else {
//           console.error("Failed to fetch blogs");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchAllBlogs();
//   }, []);

//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <BlogItem
//                 selectedBlog={selectedBlog}
//                 setSelectedBlog={setSelectedBlog}
//                 allBlogs={allBlogs}
//                 setAllBlogs={setAllBlogs}
//               />
//             }
//           />
//         </Routes>
//         <Routes>
//           <Route
//             path="/blogs"
//             element={
//               <BlogList
//                 allBlogs={allBlogs}
//                 setAllBlogs={setAllBlogs}
//                 setSelectedBlog={setSelectedBlog}
//               />
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./component/BlogList";
import BlogItem from "./component/BlogItem";
import EditBlog from "./component/EditBlog"; // Import EditBlog component
import Open from "./component/Open";


const App = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState({
    subject: "",
    blogHead: "",
    blogData: "",
  });

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/blogs");
        if (response.status === 200) {
          setAllBlogs(response.data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BlogItem
                selectedBlog={selectedBlog}
                setSelectedBlog={setSelectedBlog}
                allBlogs={allBlogs}
                setAllBlogs={setAllBlogs}
              />
            }
          />
          <Route
            path="/blogs"
            element={
              <BlogList
                allBlogs={allBlogs}
                setAllBlogs={setAllBlogs}
                setSelectedBlog={setSelectedBlog}
              />
            }
          />
          <Route
            path="/blogs/:id/edit" // Route to edit blog page
            element={<EditBlog allBlogs={allBlogs} />} // Pass allBlogs to EditBlog
          />
          <Route
            path="/blogs/:id" // Route to edit blog page
            element={<Open allBlogs={allBlogs}/>} // Pass allBlogs to EditBlog
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
