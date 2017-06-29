'use strict';

var soap = require('soap');
var Promise = require('promise');

soap.WSDL.prototype.ignoredNamespaces = ['xs', 'xsd'];
  
var Client = function (data) {  
    this.data = data;
}

Client.prototype.data = {}

Client.assesorSOAPClient = function (url, args) {

  return new Promise(function (fulfill, reject){

  	soap.createClient(url, function(err, client) {
      //console.log(client.saveAssessor.toString());
       //console.log(client);
        client.saveAssessor(args, function(err, result, raw, soapHeader) {
            //console.log(client);
            //console.log(result.return);
            if(err) reject(err)

            fulfill(new Client(result))
            //callback(new Client(result));
        }, {timeout: 50000});
    	});
  })
}

Client.imageSOAPClient = function (url, args) {

  console.log(url)

  return new Promise(function (fulfill, reject){

    console.log("00000000000000")

	     soap.createClient(url, function(err, client) {

          client.saveImage(args, function(err, result, raw, soapHeader) {
              //console.log(raw);
              if(err) reject(err)

              fulfill(new Client(result))

              //callback(new Client(result));
          }, {timeout: 50000});
    	 });
  })
}

var client = Promise.denodeify(Client);

module.exports = client;