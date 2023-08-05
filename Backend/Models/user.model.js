const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
let isTableSynced = false;

// function to check the table is synced orr not
const syncTableOnce = async () => {
  if (!isTableSynced) {
    try {
      await sequelize.sync();
      console.log("Table created successfully");
      isTableSynced = true;
    } catch (error) {
      console.log(error.message);
      console.log("Failed to create table");
    }
  }
};
syncTableOnce();

module.exports = User;
