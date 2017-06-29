var models = require('../models')
var constants = require('../config/constants.json')
var Promise = require('promise');
var winston = require('winston');
var async = require("async");

var client = require('../client')
var assessorValuesSoapClient = require('../client/assessorValuesSoapClient')

var soapAssessorValuesTask = function () {

	return new Promise(function (fulfill, reject){

		models.AssesorValues.find({ completeStatus: 'P'	}, function (err, result) {

			if(err){
				winston.log("error","soapAssesorValues 6=> " +JSON.stringify(err))
				reject(true)
			}

			var obj = {}

			Promise.all(result).then(function(assessorValues) {

				async.eachSeries(assessorValues, function (data, next) { 

					winston.log("info","SOAP Assesor values: " + JSON.stringify(data))

					var obj = {
						':wFNo' : data.wFNo,
						':aCR' : data.aCR,
						':baldTyrePenalty' : data.baldTyrePenalty,
						':payableAmount' : data.payableAmount,
						':settlementMethod' : data.settlementMethod,
						':onsiteOffer' : data.onsiteOffer,
						':inspectionType' : data.inspectionType,
						':inspectionRemarks' : data.inspectionRemarks,
						':policeReportRequested' : data.policeReportRequested,
						':specialRemarks' : data.specialRemarks,
						':investigateClaim' : data.investigateClaim,
						':arrivalAtAccident' : data.arrivalAtAccident,
						':mileage' : data.mileage,
						':otherCosts' : data.otherCosts,
						':reason' : data.reason,
						':preAccidentValue' : data.preAccidentValue,
						':underInsuredPenalty' : data.underInsuredPenalty,
						':excess' : data.excess,
						':professionalFee' : data.professionalFee,
						':telephone' : data.telephone,
						':totalCost' : data.totalCost,
						':photoCount' : data.photoCount,
						':repairComplete' : data.repairComplete,
						':salvageRecieved' : data.salvageRecieved
					}

					//console.log(JSON.stringify(obj))

					assessorValuesSoapClient(constants.ASSESOR_VALUE_SERVICE_URL, obj).then(function(soapResult) {

						winston.log("info",data.wFNo + "SOAP: Assesor values result: " + JSON.stringify(soapResult))

						if(typeof soapResult.return !== 'undefined'){
							//if(soapResult.return){
								if (soapResult.return.charAt(0) === "S") {//S

									var conditions = { wFNo: data.wFNo,	completeStatus: 'P' }
									  , update = { completeStatus: 'C' }
									  , options = { multi: true };

									models.AssessorValues.update(conditions, update, options, function(err, result2) {

										if(err) winston.log("error","AssessorValues.update " +JSON.stringify(err))

										winston.log("info",data.wFNo + " => Completed")

									})
								}
							//}
						}
					})
				})

				fulfill(true)

			})

		})

	});

}	

var task = Promise.denodeify(soapAssessorValuesTask);

module.exports = task;	
