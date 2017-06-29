var express = require('express'),
	router = express.Router()
var winston = require('winston');

var models = require('../models')
var soapassessorvaluestask = require('../tasks/soapAssessorValuesTasks')

router.get('/', function (req, res) {
	res.render('home/index', {app : 'Mobile Insurance REST Service.'})
})

router.post('/assesorValuesService', function (req, res) {

	var wFNo = req.body.wFNo
	var aCR = req.body.aCR
	var baldTyrePenalty = req.body.baldTyrePenalty
	var payableAmount = req.body.payableAmount
	var settlementMethod = req.body.settlementMethod
	var onsiteOffer = req.body.onsiteOffer
	var inspectionType = req.body.inspectionType
	var inspectionRemarks = req.body.inspectionRemarks
	var policeReportRequested = req.body.policeReportRequested
	var specialRemarks = req.body.specialRemarks
	var investigateClaim = req.body.investigateClaim
	var arrivalAtAccident = req.body.arrivalAtAccident
	var mileage = req.body.mileage
	var otherCosts = req.body.otherCosts
	var reason = req.body.reason
	var preAccidentValue= req.body.preAccidentValue
	var underInsuredPenalty = req.body.underInsuredPenalty
	var excess = req.body.excess
	var professionalFee= req.body.professionalFee
	var telephone = req.body.telephone
	var totalCost = req.body.totalCost
	var photoCount  = req.body.photoCount
	var repairComplete = req.body.repairComplete
	var salvageRecieved = req.body.salvageRecieved
	var noOfImages = req.body.noOfImages


	var assessorValue = new models.AssessorValues({
		wFNo : wFNo,
		aCR : aCR,
		baldTyrePenalty : baldTyrePenalty,
		payableAmount : payableAmount,
		settlementMethod : settlementMethod,
		onsiteOffer : onsiteOffer,
		inspectionType : inspectionType,
		inspectionRemarks : inspectionRemarks,
		policeReportRequested : policeReportRequested,
		specialRemarks : specialRemarks,
		investigateClaim : investigateClaim,
		arrivalAtAccident : arrivalAtAccident,
		mileage : mileage,
		otherCosts : otherCosts,
		reason : reason,
		preAccidentValue : preAccidentValue,
		underInsuredPenalty : underInsuredPenalty,
		excess : excess,
		professionalFee : professionalFee,
		telephone : telephone,
		totalCost : totalCost,
		photoCount : photoCount,
		repairComplete : repairComplete,
		salvageRecieved : salvageRecieved,
		noOfImages: noOfImages,
		completeStatus : "P"
	})

	assessorValue.save(function (err, assessorValue) {

		 if (err){
			winston.log("error","Error " + JSON.stringify(err))

			var error = {}
			error.name = err.name;
			error.message = err.message;
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify(err));
		} 
	  
	 	var success = {}
		success.message = "Successfully inserted record: " + assessorValue.get('wFNo')

		winston.log("info","Successfully inserted record to db: " + assessorValue.get('wFNo'))

		soapassessorvaluestask().then(function(soapTResult) {
			winston.log("info",'success in assessor soap: ' + JSON.stringify(soapTResult))
		}).catch(function(err){
			winston.log("error",'error in assessor soap: ' + JSON.stringify(err))
		})

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(success));

	});
})

router.post('/imageService', function (req, res) {

	var image = req.body.image
	var imageName = req.body.imageName
	var intimationNo = req.body.intimationNo
	var inspectionType = req.body.inspectionType

	var images = new models.Images({
		intimationNo : intimationNo,
		imageName : imageName,
		image : image,
		inspectionType : inspectionType,
		completeStatus : "P"
	})

	images.save(function (err, assessorValue) {
		  if (err) {
		  	winston.log("error","Error " + JSON.stringify(err))

			var error = {}
			error.name = err.name;
			error.message = err.message;
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify(err));
		  }
	  
		var success = {}
		success.message = "Successfully inserted image: " + assessorValue.get('imageName')

		winston.log("info","Successfully inserted record to db: " + assessorValue.get('imageName'))

		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(success));
	 	

	});
})

module.exports = router;