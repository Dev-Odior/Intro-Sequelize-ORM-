'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userName: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );

      // Avoid adding an index if it already exists
      const indexExists = await queryInterface.sequelize.query(
        `SELECT 1 FROM pg_indexes WHERE indexname = 'users_email'`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (indexExists.length === 0) {
        await queryInterface.addIndex('Users', ['email'], { unique: true, transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
