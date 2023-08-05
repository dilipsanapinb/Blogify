const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Db");
const User = require("../Models/user.model");
const Post = require("../Models/posts.model");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE", // Set to "CASCADE" to update the Comment's userId when User's id changes
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
      onUpdate: "CASCADE", // Set to "CASCADE" to update the Comment's postId when Post's id changes
    },
  },
  {
    underscored: true,
    associate: (models) => {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
    },
  }
);

let isTableSynced = false;

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

module.exports = Comment;
