const express = require("express");
const Comment = require("../Models/comments.models");
const authenticate = require("../Middlewares/authentication.middleware");
const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/api/comments", authenticate, async (req, res) => {
    try {
        const { comment, postId } = req.body;
        const userId = req.body.userId;

        const newComment = await Comment.create({ comment, postId, userId });
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
commentRouter.get('/api/commentsonpost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({ where: { postId } });
        res.status(200).json({ message: "All comments for the post", comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get comments for the post", error: error.message });
    }
});

// Get a specific comment by commentId
commentRouter.get('/api/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findOne({ where: { id: commentId } });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment found", comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get the comment", error: error.message });
    }
});



module.exports = commentRouter;
