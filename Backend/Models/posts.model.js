const {DataTypes } = require('sequelize');
const sequelize = require('../Config/Db');
const User=require('../Models/user.model')
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            module: User,
            key: 'id'
        }
    }
});

sequelize.sync()
    .then(() => {
        console.log("Table created successfully");
    })
    .catch((error) => {
        console.log(error.message);
        console.log("Failed to create table");
    });


// relationship b/w User and Posts
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;
