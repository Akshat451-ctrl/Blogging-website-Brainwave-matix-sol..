import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Post from "./Post.js";
import Comment from "./Comment.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "users",       // match with your MySQL table
    timestamps: true,
    createdAt: "created_at", // map to existing column
    updatedAt: "updated_at"
  }
);

// Associations
// User.hasMany(Post, { foreignKey: "authorId", as: "posts" });
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });

export default User;
