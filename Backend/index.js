require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./Config/Db");
const { userRouter } =require('./Routes/user.route')
const PORT = process.env.port || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Blogify App:Express Yourself");
});

app.use('/user', userRouter);

app.listen(PORT, async () => {
  await sequelize;

  console.log(`Server is running on port: ${PORT}`);
});
