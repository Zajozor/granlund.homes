// migrations/xxxx-create-issues.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('issues', {
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.ENUM('open', 'in_progress', 'closed'),
        allowNull: false,
      },
      description: Sequelize.STRING,
      owner: {
        type: Sequelize.STRING,
        references: {
          model: 'employees',
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
    await queryInterface.dropTable('issues');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_issues_status";');
  },
};
