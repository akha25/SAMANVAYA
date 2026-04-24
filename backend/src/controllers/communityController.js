const CommunityPost = require('../models/CommunityPost');
const BlogPost = require('../models/BlogPost');

exports.getFeed = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate('userId', 'name avatar')
      .populate('comments.userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, media } = req.body;
    const newPost = await CommunityPost.create({
      userId: req.user.id,
      content,
      media
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
