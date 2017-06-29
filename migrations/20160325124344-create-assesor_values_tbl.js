'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.createTable(
        'assesorvalues',
        {
          id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          wFNo: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          inspectionType: Sequelize.INTEGER,
          salvageRecieved: Sequelize.STRING,
          onsiteOffer: Sequelize.DOUBLE,
          excess: Sequelize.DOUBLE,
          aCR: Sequelize.DOUBLE,
          repairComplete: Sequelize.CHAR(1),
          specialRemarks: Sequelize.STRING,
          payableAmount: Sequelize.DOUBLE,
          telephone: Sequelize.DOUBLE,
          reason: Sequelize.STRING,
          mileage: Sequelize.DOUBLE,
          investigateClaim: Sequelize.CHAR(1),
          policeReportRequested: Sequelize.CHAR(1),
          professionalFee: Sequelize.DOUBLE,
          baldTyrePenalty: Sequelize.DOUBLE,
          photoCount: Sequelize.INTEGER,
          underInsuredPenalty: Sequelize.DOUBLE,
          inspectionRemarks: Sequelize.STRING,
          arrivalAtAccident: Sequelize.DATEONLY,
          otherCosts: Sequelize.DOUBLE,
          totalCost: Sequelize.DOUBLE,
          preAccidentValue: Sequelize.DOUBLE,
          settlementMethod: Sequelize.STRING,
          noOfImages: Sequelize.INTEGER,
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
    return queryInterface.dropTable('assesorvalues');
  }
};
