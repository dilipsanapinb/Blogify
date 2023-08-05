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


module.exports = commentRouter;
