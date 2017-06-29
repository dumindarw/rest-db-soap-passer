'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.createTable(
        'images',
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
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          image: Sequelize.TEXT('long'),
          imageName: Sequelize.STRING,
          completeStatus: {
            type: Sequelize.STRING
          }
        },
        {
          engine: 'MYISAM', // default: 'InnoDB'
          charset: 'latin1' // default: null
        }
      )
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.dropTable('images');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
