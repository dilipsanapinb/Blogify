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


// relationship b/w User and Posts
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;
