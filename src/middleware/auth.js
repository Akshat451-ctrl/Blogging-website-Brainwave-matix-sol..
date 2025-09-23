import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB using decoded token id
    const user = await User.findByPk(decoded.user.id, {
      attributes: ["id", "username", "email"], // only necessary fields
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user info to request object
    req.user = user; // ✅ now req.user.id, req.user.username, req.user.email all available

    next();
  } catch (err) {
    console.error("❌ JWT Middleware Error:", err.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;
