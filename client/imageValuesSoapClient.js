var Promise = require('promise');
var soap = require('soap');
var winston = require('winston');

var soapCreateClient = Promise.denodeify(require('soap').createClient);

var imageSOAPClient = function (url, args) {

  //console.log(url)

  return new Promise(function (fulfill, reject){

    //console.log("0000000000000")

    soapCreateClient(url).then(function (client) {

      //var clnt = Promise.denodeify(client);

      client.saveImage(args, function(err, result, raw, soapHeader) {
          console.log(result);
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

var client = Promise.denodeify(imageSOAPClient);

module.exports = client;