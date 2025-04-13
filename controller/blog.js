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
