const sequelize = require('sequelize');
const db = require('../config/database.js');

module.exports = db.define('post', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    }

});