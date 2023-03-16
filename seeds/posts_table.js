'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('posts', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updateDAt: Sequelize.DATE
     });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('posts');
  }
};