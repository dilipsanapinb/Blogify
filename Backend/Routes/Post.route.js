const express = require("express");
const Post = require("../Models/posts.model");
const authenticate = require("../Middlewares/authentication.middleware");
const postRouter = express.Router();

postRouter.post("/api/create", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;
    console.log(userId);
    const newPost = await Post.create({ title, content, userId });
    res.status(201).send({message:"New post created","Post":newPost})
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong at creating the post" });
  }
});

module.exports = postRouter;
