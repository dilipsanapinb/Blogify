const { DataTypes } = require("sequelize");
const sequelize = require("../Config/Db");
const User = require("./user.model");
const Post = require("./posts.model");

const Comment = sequelize.define("Comment", {
  commentId: {
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
});

let isTableSynced = false;

// function to check the table is synced orr not
const syncTableOnce = async () => {
    if (!isTableSynced) {
        try {
            await sequelize.sync();
            console.log('Table created successfully');
            isTableSynced = true;
        } catch (error) {
            console.log(error.message);;
            console.log('Failed to create table');
        }
    }
}
syncTableOnce();

// Association

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

module.exports = Comment;
