const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect('mongodb+srv://raamv1464:raamv1464@mernproject.howwfo8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'merndata',
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const blogSchema = new mongoose.Schema({
  blogHead: String,
  blogData: String,
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { blogHead, blogData } = req.body;
    const newBlog = new Blog({ blogHead, blogData });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Endpoint to update a specific blog by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlogData = req.body;

    // Find the blog by ID and update its data
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedBlogData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
