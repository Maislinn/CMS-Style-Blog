const sequelize = require('sequelize');
const db = require('../config/database.js');

module.exports = db.define('user', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        //Trying out unique sequelize feature
        unique: true,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    }
});
