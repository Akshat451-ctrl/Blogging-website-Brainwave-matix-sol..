import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.create({ content, postId, userId: req.user.id });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
