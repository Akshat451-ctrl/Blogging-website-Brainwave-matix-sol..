import express from "express";
import { createComment, getComments } from "../controllers/commentController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/:postId", getComments);

export default router;
