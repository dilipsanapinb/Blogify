require("dotenv").config();
const express = require("express");
const connection = require("./Config/Db");

const PORT = process.env.port || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Blogify App:Express Yourself");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Conncted to DB");
  } catch (error) {
    console.log(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
