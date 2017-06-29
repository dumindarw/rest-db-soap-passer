"use strict";

module.exports = function(mongoose) {

  var schema = new mongoose.Schema({
        intimationNo: Number,
        imageName: String,
        image: String,
        completeStatus: String,
        inspectionType: Number
  })

  var Images = mongoose.model("Images", schema);

  return Images;
};