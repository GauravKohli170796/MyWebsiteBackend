var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var LOVE_CALCULTOR_COLLECTION = new Schema({
    FIRST_NAME:{
    type:String,
    required:true
    },

    SECOND_NAME:{
    type:String,
    required:true
    },

    LOVE_PERCENTAGE_RESULT:{
    type:String,
    required:true
    },

    SEARCH_DATE_TIME:{
    type:Date,
    default:Date.now,
    required:true
    }

 },{});


 


  module.exports = mongoose.model(
    "LOVE_CALCULTOR_COLLECTION",
     LOVE_CALCULTOR_COLLECTION
  );