const exp = require('constants');
const express = require('express');
const Comment = require('../Models/comments.models');
const User = require('../Models/user.model');
const Post = require('../Models/posts.model');
const authenticate=require('../Middlewares/authentication.middleware')

const commentRoute = express.Router();

// create comment
commentRoute.post('/api/create', authenticate, async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.body.userId;

        const newComment = await Comment.create({ postId, userId, comment });
        res.status(201).json({ message: "Comment create successfully", 'comment': newComment })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong at creating the comment",
            error: error.message,
        });
    }
});

// Get all comments for a specific post
commentRoute.get('/api/comments/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        
        // Find all comments for the given postId
        const comments = await Comment.findAll({ where: { postId } });

        res.status(200).json({ message: 'All comments for the post', comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while getting the comments', error: error.message });
    }
});

module.exports = commentRoute;