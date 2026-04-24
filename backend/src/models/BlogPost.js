const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, enum: ['Diet', 'Workout', 'Wellness', 'Recipes'], required: true },
  tags: [{ type: String }],
  author: { type: String, required: true },
  coverImage: { type: String },
  readTime: { type: Number }, // in minutes
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
