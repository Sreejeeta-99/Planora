import User from "./../model/user.js";
import Blog from "./../model/blog.js";

export const createBlog = async (req, res) => {
  console.log(req.userId);
  console.log(req.body);
  const { title, content, image } = req.body;
  const userExist = await User.findById(req.userId);
  if (!userExist) {
    return res.status(400).json({ error: "Author not found" });
  }
  const blog = new Blog({ title, content, image, author: req.userId });
  await blog.save();
  userExist.blogs.push(blog._id);
  await userExist.save();
  return res.json({ message: "Blog created successfully", blog: blog._id });
};

// Fetching all blogs from the database
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", null, null, { strictPopulate: false })
    .sort({ createdAt: -1 });
  return res.json(blogs);
};

//Fetching a single blog by its ID
export const fetchSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  return res.json(blog);
};

//update blog
export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  if (blog.author._id.toString() !== req.userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const { title, content } = req.body;
  blog.title = title;
  blog.content = content;
  await blog.save();
  return res.json({ message: "Blog updated successfully", blog });
};

//Delete blog
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  console.log(blog);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  if (!blog.author) {
    return res.status(403).json({ error: "Blog author not found" });
  }
  if (blog.author._id.toString() !== req.userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await Blog.findByIdAndDelete(req.params.id);
  return res.json({ message: "Blog deleted successfully" });
};

//blog likes
export const likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  //console.log("User ID:", req.userId);
  const index = blog.likes.indexOf(req.userId);
  if (index !== -1) {
    //if the user has already liked the blog
    blog.likes.splice(index, 1); // Remove like
  } else {
    blog.likes.push(req.userId);
  }
  await blog.save();
  return res.json({
    message: "Likes",
    message: index !== -1 ? "Unliked" : "Liked",
    totalLikes: blog.likes.length,
  });
};

// Blog comment
export const addComment = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  // const commentText = req.body.text;
  // if (!commentText || commentText.trim() === '') {
  //   return res.status(400).json({ error: "Comment text is required" });
  // }

  const newComment = {
    comment: req.body.comment,
    author: req.userId,
  };

  blog.comments.push(newComment);
  await blog.save();
  return res.json({
    message: "Comment added successfully",
    comment: newComment,
  });
};

//view blog
export const viewBlog = async (req, res) => {
  console.log("Trying to fetch blog:", req.params.id);
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  blog.views += 1; // Increment view count
  await blog.save(); // Save updated blog
  return res.json(blog);
};
