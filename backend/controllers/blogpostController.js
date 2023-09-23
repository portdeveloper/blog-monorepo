const Blogpost = require("../models/blogpost");
const Comment = require("../models/comment");

exports.createBlogpost = async (req, res) => {
  try {
    const blogpost = new Blogpost({ ...req.body, user: req.user._id });
    const savedBlogpost = await blogpost.save();
    res.status(201).json(savedBlogpost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogposts = async (req, res) => {
  try {
    const blogposts = await Blogpost.find({ published: true })
      .populate("user", "username email")
      .populate("comments");
    res.status(200).json(blogposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBlogposts = async (req, res) => {
  try {
    const blogposts = await Blogpost.find({})
      .populate("user", "username email")
      .populate("comments");
    res.status(200).json(blogposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogpostById = async (req, res) => {
  try {
    const blogpost = await Blogpost.findById(req.params.id)
      .populate("user", "username email")
      .populate("comments");
    if (!blogpost)
      return res.status(404).json({ message: "Blogpost not found" });
    res.status(200).json(blogpost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlogpost = async (req, res) => {
  try {
    const blogpost = await Blogpost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blogpost)
      return res.status(404).json({ message: "Blogpost not found" });
    res.status(200).json(blogpost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlogpost = async (req, res) => {
  try {
    const blogpost = await Blogpost.findByIdAndDelete(req.params.id);
    if (!blogpost)
      return res.status(404).json({ message: "Blogpost not found" });
    res.status(204).json({ message: "Blogpost deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCommentToBlogpost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    const blogpost = await Blogpost.findById(req.params.id);
    if (!blogpost)
      return res.status(404).json({ message: "Blogpost not found" });

    const comment = new Comment({
      content,
      blogpost: blogpost._id,
    });

    const savedComment = await comment.save();
    blogpost.comments.push(savedComment._id);
    await blogpost.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error); // Log error message for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteCommentFromBlogpost = async (req, res) => {
  try {
    const blogpost = await Blogpost.findById(req.params.id);
    if (!blogpost)
      return res.status(404).json({ message: "Blogpost not found" });

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    await comment.remove();
    blogpost.comments.pull(comment._id);
    await blogpost.save();

    res.status(204).json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error); // Log error message for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
