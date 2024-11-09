// migrations/xxxx-create-catalogue.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('catalogues', {
      uid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.STRING,
      manufacturer: Sequelize.STRING,
      url: Sequelize.STRING,
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
    await queryInterface.dropTable('catalogues');
  },
};
