'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_register', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_name_en: {
        type: Sequelize.STRING
      },
      company_name_jp: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      booking_count: {
        defaultValue: 4,
        type: Sequelize.TINYINT
      },
      allow: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      operator: {
        type: Sequelize.STRING
      },
      highlight: {
        defaultValue: 0,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_register');
  }
};