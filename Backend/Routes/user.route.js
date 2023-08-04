const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../Config/Db");
const User = require("../Models/user.model");

const userRouter = express.Router();

// Create the user

userRouter.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(req.body);
    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User with this email already exists" });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err);
                res
                    .status(500)
                    .json({ message: "Error occurred during password hashing" });
            } else {
                try {
                    const newUser = await User.create({ name, email, password: hash });
                    res.status(201).json({ message: "Registration is successful","user":newUser });
                } catch (err) {
                    res
                        .status(500).send({
                            message: "Error occur at registering the use", "Error": err.message
                        })
                }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userRouter.post('/api/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send("User with emailid not found")
        }
        // console.log(user);
        let hashpass = user.password;
        bcrypt.compare(password, hashpass, async function (err, result) {
            if (result) {
                var token = jwt.sign({ userID: user.id }, "masai");
                res.send({ "msg": "Login is Successfull", "token": token })
            } else {
                res.status(401).send("Wrong Credential's");
                console.log(err);
            }
        });
            }
    catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
    
});

module.exports = { userRouter };
