require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./Config/Db");
const User = require('./Models/user.model');
const Post = require('./Models/user.model');
const { userRouter } = require('./Routes/user.route');
const authenticate = require('./Middlewares/authentication.middleware');
const errorHandler=require('./Middlewares/errorhandler.middleware')
const postRouter = require('./Routes/Post.route');
const commentRoute = require("./Routes/Comment.route");
const commentRouter = require("./Routes/Comment.route");

// port
const PORT = process.env.port || 5000;


// Middlewares
app.use(express.json());


// Basic route
app.get("/", (req, res) => {
    res.status(200).json({ message:"Welcome to the Blogify App:Express Yourself"});
});

// Routes
app.use(errorHandler);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use(authenticate)
app.use('/comment',commentRouter)




app.listen(PORT, async () => {
    await sequelize;

    console.log(`Server is running on port: ${PORT}`);
});
