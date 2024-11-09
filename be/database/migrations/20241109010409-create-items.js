// migrations/xxxx-create-items.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      uid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      property_id: {
        type: Sequelize.STRING,
        references: {
          model: 'properties',
          key: 'uid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      coordinates: Sequelize.STRING,
      catalogue_uid: {
        type: Sequelize.STRING,
        references: {
          model: 'catalogues',
          key: 'uid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
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
    await queryInterface.dropTable('items');
  },
};
