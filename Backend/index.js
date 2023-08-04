require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./Config/Db");
const User = require('./Models/user.model');
const Post = require('./Models/user.model');
const { userRouter } = require('./Routes/user.route');
const authenticate = require('./Middlewares/authentication.middleware');
const postRouter=require('./Routes/Post.route')
const PORT = process.env.port || 5000;


// Middlewares
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Blogify App:Express Yourself");
});

// Routes

app.use('/user', userRouter);
app.use('/post', postRouter)




app.listen(PORT, async () => {
  await sequelize;

  console.log(`Server is running on port: ${PORT}`);
});
