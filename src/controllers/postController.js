import {User , Post } from "../models/index.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }
      if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" }); // 🔑 debug
    }

    // req.user.id comes from authMiddleware
    const newPost = await Post.create({
      title,
      body,
      authorId: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("❌ Error creating post:", err);
    res.status(500).json({ error: "Server error while creating post" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "author" }]
    });

    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};
