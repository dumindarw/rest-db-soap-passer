"use strict";

module.exports = function(mongoose) {

  var schema = new mongoose.Schema({
      id : Number,
      intimationNo: Number,
      imageCount: Number
  })

  var Logs = mongoose.model("Logs", schema);

  return Logs;
};