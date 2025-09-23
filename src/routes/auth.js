import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user & get token
router.post("/login", loginUser);

export default router;
