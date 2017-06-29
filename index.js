var express = require('express')
var winston = require('winston');
var bodyParser = require('body-parser')
var nodeSchedule = require('node-schedule');
var app = express();
var router = require('./controllers/routes')

var dbtask = require('./tasks/dbTasks')
var soaptask = require('./tasks/soapTasks')
var dbtask2 = require('./tasks/scheduledDBTasks')

winston.add(winston.transports.File, { filename: 'insu.log', level: 'silly' });

var schedule = function() {
	dbtask().then(function(dbTResult) {

		soaptask().then(function(soapTResult) {

			//console.log(result)
			winston.log("info",'Process finished, waiting 3 minutes')
		    setTimeout(function() {
		        winston.log("info",'Going to restart');
		        schedule();
		    }, 1000 * 60 * 1);

		}).catch(function(err){
			winston.log("error",'error in scheduler1 ' + JSON.stringify(err))
			schedule();

		});
	}).catch(function(err){
		winston.log("error",'error in scheduler2 ' + JSON.stringify(err))
		schedule();

	});
}

schedule();

//nodeSchedule.scheduleJob('0 */1 * * *', function(){ // every 1 hour
nodeSchedule.scheduleJob('*/1 * * * *', function(){ //every 1 min

	winston.log("info", "Running node-scheduler....")

	dbtask2().then(function(result) {

		winston.log("info", "Node-scheduler result: " + result)

	}).catch(function(err){
		winston.log("error",'error in node-scheduler ' + JSON.stringify(err))
	}); 
});

app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

var port = process.env.PORT || 3000

app.use('/api', router)
app.listen(port)

winston.log("info", 'Rest service running on port: ' + port)