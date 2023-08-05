require("dotenv").config();
const {sequelize,users,posts,comments} = require("./models");
const express = require("express");
const app = express();
const { userRouter } = require("./Routes/user.route");
const errorHandler = require("./Middlewares/errorhandler.middleware");
const postRouter = require("./Routes/Post.route");
const commentRouter = require("./Routes/Comment.route");

// port
const PORT = process.env.port || 5000;

// Middlewares
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.status(200).json({ "message":"Welcome to the Blogify App:Express Yourself"});
});

// Routes
app.use(errorHandler);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server is running on port: ${PORT}`);
    });
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Something went wrong at connction to Db");
  });
