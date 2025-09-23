import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/posts
// @desc    Create new post (Protected)
// @access  Private
router.post("/", authMiddleware, createPost);

// @route   GET /api/posts
// @desc    Get all posts (Public)
// @access  Public
router.get("/", getPosts);

export default router;
