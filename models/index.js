'use strict';

var fs        = require('fs');
var path      = require('path');
var mongoose = require('mongoose');
var winston = require('winston');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  mongoose.connect(process.env[config.use_env_variable]);
} else {

  var uri = 'mongodb://' + 
    config.host + '/' + 
    config.database + "'";

  var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    auth: {
      authdb: config.database
    },
    user: config.username,
    pass: config.password
  }

  mongoose.connect(uri, options);

}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    
    var model = require(path.join(__dirname, file))(mongoose);

    db[model.modelName] = model;

  });

Object.keys(db).forEach(function(modelName) {

  if (db[modelName].associate) {
    
    db[modelName].associate(db);
  }
});


db.mongoose = mongoose;

module.exports = db;