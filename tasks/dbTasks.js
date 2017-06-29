
var models = require('../models')
var Promise = require('promise');
var winston = require('winston');
var async = require("async");

var dbTask = function () {

	return new Promise(function (fulfill, reject){

		//console.log(models.AssessorValues);

		models.AssessorValues.find({
			$or : [{'completeStatus': 'C'}, {'completeStatus': 'P'}] }, 
			'noOfImages wFNo' , 
			function(err, result) {

				if (err){
					winston.log("error","AssesorValues.find " + JSON.stringify(err))
					reject(true)
				}

				winston.log("info","No. of pending records : " + result.length);

				async.forEachOf(result, function (data, key, callback) {

					models.Images.count({
				        intimationNo: data.wFNo,
				        completeStatus: 'P'
				     }, function( err, count){

				     	if (err){
							winston.log("error","Images.count " + JSON.stringify(err))
							reject(true)
						}

				     	winston.log("info",data.wFNo + " => Actual Image count : " + count + " ,Promised Image count : " + data.noOfImages)

				     	if(count >= data.noOfImages){//need change to >=

				     		var conditions = { wFNo: data.wFNo,	completeStatus: 'P' }
				     		  , condition2 = { intimationNo: data.wFNo, completeStatus: 'P' }
							  , update = { completeStatus: 'R' }
							  , options = { multi: true };

							models.AssessorValues.update(conditions, update, options, function(err, upresult1) {

								if (err){
									winston.log("error","AssesorValues.update " + JSON.stringify(err))
									reject(true)
								}

								winston.log("info",data.wFNo + " => Assesor values UPDATE Success, count: " + JSON.stringify(upresult1))

								models.Images.update(condition2, update, options, function(err, upresult2) {

									if (err){
										winston.log("error","Images.update " + JSON.stringify(err))
										reject(true)
									}

									winston.log("info",data.wFNo + " => Images UPDATE Success, count: " + JSON.stringify(upresult2))

									fulfill(true)

								})

							});

				     	}

					})

				})

			})

	})

}

var task = Promise.denodeify(dbTask);

module.exports = task;