import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Post model
const Post = sequelize.define(
  "Post",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    tags: { type: DataTypes.STRING },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false, // foreign key
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Post;
