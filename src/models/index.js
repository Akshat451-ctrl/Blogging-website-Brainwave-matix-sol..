import User from "./User.js";
import Post from "./Post.js";

// Define associations here
Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Post, { foreignKey: "authorId", as: "posts" });

export { User, Post };
