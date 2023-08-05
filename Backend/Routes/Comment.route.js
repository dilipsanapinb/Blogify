const express = require("express");
const { sequelize, users, posts, comments } = require("../models");
const authenticate = require("../Middlewares/authentication.middleware");
const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/api/comments", authenticate, async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const userId = req.body.userId;

    const newComment = await comments.create({ comment, postId, userId });
    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to create comment", error: error.message });
  }
});

// Get all comments for a specific post by postId
commentRouter.get("/api/commentsonpost/:postId", async (req, res) => {
  try {
    comments.belongsTo(users, { foreignKey: 'userid' });
    users.hasMany(comments, { foreignKey: 'userId' });
    comments.belongsTo(posts, { foreignKey: 'postId' });
    posts.hasMany(comments,{foreignKey:'postId'})
    const postId = req.params.postId;
    const allcomments = await comments.findAll({
      where: { postId },
    include:[posts]});
    res.status(200).json({ message: "All comments for the post", allcomments });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Failed to get comments for the post",
        error: error.message,
      });
  }
});

// Get a specific comment by commentId
commentRouter.get("/api/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await comments.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment found", comment });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to get the comment", error: error.message });
  }
});

// Update a comment by commentId
commentRouter.put(
  "/api/comments/:commentId",
  authenticate,
  async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const updates = req.body;

      const getComment = await comments.findOne({ where: { id: commentId } });
      if (!getComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      await getComment.update(updates);
      const updatedComment = await Comment.findOne({
        where: { id: commentId },
      });

      res
        .status(200)
        .json({
          message: "Comment updated successfully",
          UpdatedCommetn: updatedComment,
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          message: "Failed to update the comment",
          error: error.message,
        });
    }
  }
);

// delete a comment
commentRouter.delete(
  "/api/comments/:commentId",
  authenticate,
  async (req, res) => {
    try {
      const commentId = req.params.commentId;

      const deletedComment = await comments.destroy({
        where: { id: commentId },
      });
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to delete the comment",
        error: error.message,
      });
    }
  }
);
module.exports = commentRouter;
