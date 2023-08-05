const express = require("express");
const { sequelize, users, posts, comments } = require("../models");
const {Op}=require('sequelize')
const authenticate = require("../Middlewares/authentication.middleware");
const postRouter = express.Router();

// Create a post
postRouter.post("/api/create", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.body.userId;
    console.log(userId);
    const newPost = await posts.create({ title, content, userId });
    res.status(201).send({ message: "New post created", Post: newPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong at creating the post" });
  }
});

// get all posts
postRouter.get("/api/posts", async (req, res) => {
  try {
    users.hasMany(posts, { foreignKey: 'userId' });
    posts.belongsTo(users,{foreignKey:'userId'})
    const allposts = await posts.findAll({
      include:[users]
    });
    res.status(200).send({ message: "All posts Data", AllPosts: allposts });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong at getting the all post",
      error: error.message,
    });
  }
});

// get a post by id
postRouter.get("/api/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getPost = await posts.findOne({ where: { id } });
    res
      .status(200)
      .send({ message: "Get a post by id is successfull", post: getPost });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong at getting a post by id",
      error: error.message,
    });
  }
});

// search the post by title

postRouter.get('/api/searchposts/:search', async(req, res) => {
  try {
    users.hasMany(posts, { foreignKey: "userId" });
    posts.belongsTo(users, { foreignKey: "userId" });
    const searchReasult = await posts.findAll({
      include: [users],
      where: {
        title: {
          [Op.like]:`%${req.params.search}%`,
        },
      }
    });
    res.status(200).send({ message: "search result", AllPosts: searchReasult });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something went wrong at getting a post by id",
      error: error.message,
    });
  }
})

// edit a post
postRouter.patch("/api/post/:id", authenticate, async (req, res) => {
  try {
    const postId = req.params.id;
    const updates = req.body;
    const getPost = await posts.findOne({ where: { id: postId } });
    if (!getPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await getPost.update(updates);

    const updatedPost = await Post.findOne({ where: { id: postId } });
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong at updating a post",
      error: error.message,
    });
  }
});

// delete a post
postRouter.delete("/api/post/:id", authenticate, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await posts.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post with id not found" });
    }
    await post.destroy();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong at deleting a post",
      error: error.message,
    });
  }
});

module.exports = postRouter;
