var Promise = require('promise');
var soap = require('soap');
var winston = require('winston');

var soapCreateClient = Promise.denodeify(require('soap').createClient);


var assesorSOAPClient = function (url, args) {

  console.log(url)

  return new Promise(function (fulfill, reject){

    soapCreateClient(url).then(function (client) {

      client.saveAssessor(args, function(err, result, raw, soapHeader) {
          //console.log(result);
          if(err) {
            console.log(err);
            reject(err)
          }

          fulfill(result)

      }, {timeout: 50000});
       
    }).catch(function(err) {
        winston.log("error","soapCreateClient=> "+JSON.stringify(err))
        reject(err)
    })
    
  })
}

var client = Promise.denodeify(assesorSOAPClient);

module.exports = client;