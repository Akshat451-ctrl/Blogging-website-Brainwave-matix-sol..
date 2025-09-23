import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/Comment.js";
import "./models/index.js"; // This will set up associations ONCE


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/Comment", commentRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});


const PORT = process.env.PORT || 5000;

connectDB();

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
