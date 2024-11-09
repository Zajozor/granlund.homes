// migrations/xxxx-create-employees.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employees', {
      uid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('employees');
  },
};
