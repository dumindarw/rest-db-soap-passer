'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'images',
      'inspectionType',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('images', 'inspectionType')
  }
};

