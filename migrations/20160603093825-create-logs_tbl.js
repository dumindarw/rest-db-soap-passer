'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'logs',
        {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          intimationNo: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          imageCount: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        },
        {
          engine: 'MYISAM', // default: 'InnoDB'
          charset: 'latin1' // default: null
        }
      )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.dropTable('logs');
  }
};
