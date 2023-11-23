import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const App = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});

  useEffect(() => {
    // Fetch all blogs directly when the component mounts
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blogs');
        if (response.status === 200) {
          setAllBlogs(response.data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllBlogs();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const editBlog = (blog) => {
    setShowCreateForm(false);
    setShowEditForm(true);
    setSelectedBlog(blog);
  };

  const createBlog = async () => {
    const blogHeadValue = document.getElementById('blogHead').value;
    const blogDataValue = document.getElementById('blogData').value;

    // Validate input fields
    if (!blogHeadValue.trim() || !blogDataValue.trim()) {
      setValidationError('Please fill in both Blog Head and Blog Data.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/blogs', {
        blogHead: blogHeadValue,
        blogData: blogDataValue,
      });

      if (response.status === 201) {
        const newBlog = response.data;
        document.getElementById('createdBlog').innerHTML = `<h3>Created Blog:</h3><p><strong>Blog Head:</strong> ${newBlog.blogHead}<br><strong>Blog Data:</strong> ${newBlog.blogData}</p>`;

        // Clear the form fields after successful creation
        document.getElementById('blogHead').value = '';
        document.getElementById('blogData').value = '';

        // Clear validation error
        setValidationError('');
      } else {
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateSelectedBlog = async () => {
    const editedBlogDataValue = document.getElementById('blogData').value;
  
    try {
      const response = await axios.put(
        `http://localhost:3001/api/blogs/${selectedBlog._id}`,
        {
          blogData: editedBlogDataValue,
        }
      );
  
      if (response.status === 200) {
        document.getElementById('blogData').value = '';
        setShowCreateForm(true);
        setShowEditForm(false);
        setSelectedBlog({});
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.log('err')
      // console.error('Error:', error);
    }
  };
  
  return (
    <div>
      {/* <button onClick={() => setShowCreateForm(true)}>Create Blog</button> */}
  
      {/* Create Blog Form */}
      {showCreateForm && (
        <div id="createBlogForm">
          <h2>Create Blog</h2>
  
          {/* Display validation error, if any */}
          {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
  
          <label htmlFor="blogHead">Blog Head:</label>
          <input type="text" id="blogHead" name="blogHead" required />
          <br />
  
          <label htmlFor="blogData">Blog Data:</label>
          <textarea id="blogData" name="blogData" rows="4" cols="50" required></textarea>
          <br />
  
          <button onClick={createBlog}>Submit</button>
  
          <div id="createdBlog"></div>
        </div>
      )}
  
      {/* Edit Blog Form */}
      {showEditForm && (
        <div id="editBlogForm">
          <h2>Edit Blog</h2>
          <p>
            <strong>Blog Head:</strong> {selectedBlog.blogHead} <br />
            <strong>Blog Data:</strong> {selectedBlog.blogData}
          </p>
          <label htmlFor="blogData">Edit Blog Data:</label>
          <textarea
            id="blogData"
            name="blogData"
            rows="4"
            cols="50"
            defaultValue={selectedBlog.blogData}
          ></textarea>
          <br />
  
          {/* Change the onClick handler to call updateSelectedBlog */}
          <button onClick={updateSelectedBlog}>Update Blog</button>
        </div>
      )}
  
      {/* Display All Blog Data */}
      <div id="allBlogData">
        {allBlogs.map((blog) => (
          <div key={blog._id}>
            <p>
              <strong>Blog Head:</strong> {blog.blogHead} <br />
              <strong>Blog Data:</strong> {blog.blogData}
            </p>
            <button onClick={() => editBlog(blog)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
        }
export default App;  