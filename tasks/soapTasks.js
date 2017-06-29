var models = require('../models')
var constants = require('../config/constants.json')
var Promise = require('promise');
var winston = require('winston');
var async = require("async");

var imageValuesSoapClient = require('../client/imageValuesSoapClient')
var assessorValuesSoapClient = require('../client/assessorValuesSoapClient')

var soapTask = function () {

	return new Promise(function (fulfill, reject){

		models.AssessorValues.find({ completeStatus: 'R'	}, function (err, result) {

			if(err){
				winston.log("error","soapAssesorValues 6=> " +JSON.stringify(err))
				reject(true)
			}

			var obj = {}

			Promise.all(result).then(function(assessorValues) {

				async.eachSeries(assessorValues, function (value, next) { 
				     setTimeout(function() {
				          console.log(value.wFNo);

				          winston.log("info","SOAP Assesor values: " + JSON.stringify(value))

							obj = {
								':wFNo' : value.wFNo,
								':aCR' : value.aCR,
								':baldTyrePenalty' : value.baldTyrePenalty,
								':payableAmount' : value.payableAmount,
								':settlementMethod' : value.settlementMethod,
								':onsiteOffer' : value.onsiteOffer,
								':inspectionType' : value.inspectionType,
								':inspectionRemarks' : value.inspectionRemarks,
								':policeReportRequested' : value.policeReportRequested,
								':specialRemarks' : value.specialRemarks,
								':investigateClaim' : value.investigateClaim,
								':arrivalAtAccident' : value.arrivalAtAccident,
								':mileage' : value.mileage,
								':otherCosts' : value.otherCosts,
								':reason' : value.reason,
								':preAccidentValue' : value.preAccidentValue,
								':underInsuredPenalty' : value.underInsuredPenalty,
								':excess' : value.excess,
								':professionalFee' : value.professionalFee,
								':telephone' : value.telephone,
								':totalCost' : value.totalCost,
								':photoCount' : value.photoCount,
								':repairComplete' : value.repairComplete,
								':salvageRecieved' : value.salvageRecieved
							}

							//console.log(JSON.stringify(obj))

							assessorValuesSoapClient(constants.ASSESOR_VALUE_SERVICE_URL, obj).then(function(soapResult) {

								winston.log("info",value.wFNo + " => SOAP: Assesor values result: " + JSON.stringify(soapResult))
								if(typeof soapResult.return !== 'undefined'){
									//if(soapResult.return){
										if (soapResult.return.charAt(0) === "S") {//S

											models.AssessorValues.update(conditions, update, options, function(err, result2) {

												var conditions = { wFNo: data.wFNo,	completeStatus: 'R' }
												  , update = { completeStatus: 'C' }
												  , options = { multi: true };

												if(err) winston.log("error","AssessorValues.update " +JSON.stringify(err))

												winston.log("info",data.wFNo + " => Completed")

											})
										}
									//}
								}
							})

				          next(); // don't forget to execute the callback!
				     }, 4000);
				}, function () {
				     console.log('Done going through assesor values!');
				});
			})

			fulfill(true)
		})

		models.Images.find().distinct('intimationNo', function(error, distinctRes) {

		//{"level":"error","message":"Distinct => [{\"DISTINCT\":151680},{\"DISTINCT\":152289},{\"DISTINCT\":148781},{\"DISTINCT\":153322},{\"DISTINCT\":156982}]","timestamp":"2016-07-25T08:48:47.179Z"}

			if(distinctRes.length > 0 ){

				async.eachSeries(distinctRes, function (key, nextval) { 

				models.Images.find({ completeStatus: 'R', intimationNo: key.DISTINCT }, 'imageName image intimationNo inspectionType',
					function(error, result) {

						if (err) {
		  					winston.log("error","Images.find "+JSON.stringify(err))
		  					reject(true)
		  				}

						winston.log("info","Received image count: "  + result.length)

						var imgObj = {}

						Promise.all(result).then(function(imageValues) { 

					  //console.log(values[1].dataValues);

					  async.eachSeries(imageValues, function (value, next) { 
						     setTimeout(function() {
						          console.log(value.imageName);

						         imgObj = {
										':intimationNo' : value.intimationNo,
										':image' : value.image,
										':inspectionType': value.inspectionType,
										':imageName' : value.imageName
									}

									winston.log("info","image name: "  + value.imageName)

									imageValuesSoapClient(constants.IMAGE_SERVICE_URL, imgObj).then(function(soapResult) {

										winston.log("info",value.intimationNo + " => SOAP: Images result: "  + JSON.stringify(soapResult))

										//if(typeof soapResult !== 'undefined'){
											if(typeof soapResult.return  !== 'undefined'){
												if (soapResult.return.charAt(0) === "S") {//S

													var condition = { intimationNo: value.intimationNo, imageName: value.imageName }
													  , update = { completeStatus: 'C' }
													  , options = { multi: true };

													models.Images.update(condition, update, options, function(err, upresult2) {

														if (err) winston.log("error","Images.update " + JSON.stringify(err))

														winston.log("info",value.intimationNo + " => Completed")

													})
												}
											}
										//}

									}).catch(function(err) {
									  	winston.log("error","imageValuesSoapClient=> "+JSON.stringify(err))
									})

						          next(); // don't forget to execute the callback!
						     }, 4000);
						}, function () {
						     console.log('Done going through values!');
						});
					  	
					})

					fulfill(true)

				})

				nextval();

				})
			}
			
		})
	})
}

var task = Promise.denodeify(soapTask);

module.exports = task;