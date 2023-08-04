
require("dotenv").config();

const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize(
    "blogify",
    "root",
    "Dilip@0123",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

connection.authenticate().then(() => {
    console.log('Connection has beed established succesfully');
})
    .catch((error) => {
        console.log('Failed to connect with datanase', error);
    });

    module.exports={connection}

