// migrations/xxxx-create-images.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      uid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      items_id: {
        type: Sequelize.STRING,
        references: {
          model: 'items',
          key: 'uid',
        },
        unique: true, // Ensures one-to-one relationship
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('images');
  },
};
