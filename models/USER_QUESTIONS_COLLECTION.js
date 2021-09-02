var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var USER_QUESTIONS_COLLECTION = new Schema({
    QUIZ_CREATOR_NAME:{
    type:String,
    required:true
    },

    QUIZ_UNIQUE_IDENTIFIER:{
    type:String,
    required:true
    },

    QUIZ_JSON_QUESTIONS_WITH_SOLUTION:{
    type:Array,
    required:true
    },

    QUIZ_CREATED_DATE_TIME:{
    type:Date,
    default:Date.now,
    required:true
    }

 },{});


 


  module.exports = mongoose.model(
    "USER_QUESTIONS_COLLECTION",
     USER_QUESTIONS_COLLECTION
  );