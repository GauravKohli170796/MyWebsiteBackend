var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;
var SUBMISSION_QUESTION_COLLECTION = new Schema({
    QUIZ_CREATOR_NAME:{
    type:String,
    required:true
    },

    QUIZ_SUBMITTER_NAME:{
        type:String,
        required:true
    },

    QUIZ_SUBMITTER_SCORE:{
        type:Number,
        required:true
    },
    
    QUIZ_UNIQUE_IDENTIFIER:{
    type:String,
    required:true
    },

    QUIZ_CREATED_DATE_TIME:{
    type:Date,
    default:Date.now,
    required:true
    }

 },{});



   module.exports = mongoose.model(
    "SUBMISSION_QUESTION_COLLECTION",
    SUBMISSION_QUESTION_COLLECTION
  );