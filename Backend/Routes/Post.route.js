const express = require("express");
const Post = require("../Models/posts.model");
const authenticate = require("../Middlewares/authentication.middleware");
const postRouter = express.Router();

// Create a post
postRouter.post("/api/create", authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;
        console.log(userId);
        const newPost = await Post.create({ title, content, userId });
        res.status(201).send({ message: "New post created", "Post": newPost })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Something went wrong at creating the post" });
    }
});

// get all posts
postRouter.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).send({ message: "All posts Data", "AllPosts": posts });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Something went wrong at getting the all post" });
    }
});

// get a post by id


module.exports = postRouter;
