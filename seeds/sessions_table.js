'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('Sessions', { 
      sid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      expires: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updateDAt: Sequelize.DATE
     });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('sessions');

  }
};