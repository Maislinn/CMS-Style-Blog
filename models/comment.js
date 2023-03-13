const sequelize = require('sequelize');
const db = require('../config/database.js');

//module.exports = db.define('comment', {
module.exports = db.define('posts', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    postID: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    }
});