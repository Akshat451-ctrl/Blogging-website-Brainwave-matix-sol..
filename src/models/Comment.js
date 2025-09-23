import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";  // ✅ sahi tarika


const Comment = sequelize.define(
  "Comment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "comment",        // MySQL table name
    timestamps: true,
    createdAt: "created_at",     // custom column mapping
    updatedAt: "updated_at",
  }
);

export default Comment;
