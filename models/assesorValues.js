"use strict";

module.exports = function(mongoose) {

  var schema = new mongoose.Schema({
      wFNo: Number,
      inspectionType: Number,
      salvageRecieved: String,
      onsiteOffer: Number,
      excess: Number,
      aCR: Number,
      repairComplete: String,
      specialRemarks: String,
      payableAmount: Number,
      telephone: Number,
      reason: String,
      mileage: Number,
      investigateClaim: String,
      policeReportRequested: String,
      professionalFee: Number,
      baldTyrePenalty: Number,
      photoCount: Number,
      underInsuredPenalty: Number,
      inspectionRemarks: String,
      arrivalAtAccident: Date,
      otherCosts: Number,
      totalCost: Number,
      preAccidentValue: Number,
      settlementMethod: String,
      noOfImages: Number,
      completeStatus: String
    });

  var AssessorValues = mongoose.model("AssessorValues", schema);

  return AssessorValues;

};