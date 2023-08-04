require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("blogify", "root", "Dilip@0123", {
  host: "localhost",
  dialect: "mysql",
//   dialectOptions: {
//     lowercase: false, // Make sure lowercase is set to false
//   },
});

sequelize.authenticate().then(() => {
    console.log('Connection has beed established succesfully');
})
    .catch((error) => {
        console.log('Failed to connect with datanase', error);
    });

module.exports = sequelize ;
