var models = require('../models')
var Promise = require('promise');
var winston = require('winston');

var dbTask2 = function () {
	return new Promise(function (fulfill, reject){

		asyncLoop(20, function(loop) {

	  			winston.log("info","Loop through assessor values ")

	  			models.Images.findOne({completeStatus: 'C'}, 'intimationNo', function (err, data) {
	  				if (err) winston.log("error","Images.findOne "+JSON.stringify(err))

	  				winston.log("info","Found completed image data: "+JSON.stringify(data))

	  				if(data){

			  			models.AssessorValues.remove({ completeStatus: 'C', wFNo: data.intimationNo  }, function (err, remValues) {
			  				if (err) {
			  					winston.log("error","AssessorValues.remove "+JSON.stringify(err))
			  					reject(true)
			  				}

			  				winston.log("info","REMOVING AssessorValues: "+JSON.stringify(remValues))

			  				models.Images.remove({ completeStatus: 'C', intimationNo: data.intimationNo  }, function (err, remImages) {
				  				if (err) {
				  					winston.log("error","Images.remove "+JSON.stringify(err))
				  					reject(true)
				  				}

			  						winston.log("info","REMOVING Images: "+JSON.stringify(remImages))

			  						var res = JSON.parse(remImages)
									
									if(res.n > 0){ //{"n":3,"ok":1}
										models.Logs.create({"intimationNo" : data.intimationNo,	"imageCount" : res.n }, 
											function (err, logRes) {
											if (err) winston.log("error","Log insertion: "+JSON.stringify(err))

											winston.log("info","Log table insertion: "+JSON.stringify(logRes))
											loop.next();
										})

										fulfill(true)
									}
			  				})
			  			})
		  			}


	  			})
					
		  	})
		  
	})

}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

var task = Promise.denodeify(dbTask2);

module.exports = task;