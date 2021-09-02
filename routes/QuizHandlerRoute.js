const express = require("express");
const router = express.Router();
let USER_QUESTIONS_COLLECTION=require("../models/USER_QUESTIONS_COLLECTION");
let SUBMISSION_QUESTION_COLLECTION=require("../models/SUBMISSION_QUESTION_COLLECTION");
var uniqid = require('uniqid'); 
router.post("/CreateUserQuiz",async function(req,res){
    try
    {
        let UniqueIdentifier=uniqid();
        if(!(req.body.QuizreatorName && Array.isArray(req.body.QuizQuestionsArray) && req.body.QuizQuestionsArray.length>=2))
        {
            res.json({ErrCode:1,ResMsg:"Invalid Request Parameters",UniqueIdentifier:null});
        }
        else
        {
            let ObjUSER_QUESTIONS_COLLECTION=new USER_QUESTIONS_COLLECTION({
                QUIZ_CREATOR_NAME:req.body.QuizreatorName,
                QUIZ_UNIQUE_IDENTIFIER:UniqueIdentifier,
                QUIZ_JSON_QUESTIONS_WITH_SOLUTION:req.body.QuizQuestionsArray
            });

            await ObjUSER_QUESTIONS_COLLECTION.save();

            res.json({ErrCode:0,ResMsg:"Quiz successfully submitted",UniqueIdentifier:UniqueIdentifier});
        }
    }

    catch(err)
    {
        res.json({ErrCode:2,ResMsg:err.message,UniqueIdentifier:null});
    }

});

router.get("/GiveQuizTest/:CreatorName/:QuizUniqueIdentifier",async function(req,res){
    try
    {
        if(!(req.params.CreatorName && req.params.QuizUniqueIdentifier))
        {
            res.json({ErrCode:1,ResMsg:"Invalid Request Parameters",UserQuestionJson:null,AttemptedUserJsonArray:null});
        }
        else
        {
            let UserQuestionJson=await USER_QUESTIONS_COLLECTION.findOne({QUIZ_CREATOR_NAME:req.params.CreatorName,QUIZ_UNIQUE_IDENTIFIER:req.params.QuizUniqueIdentifier}).select({QUIZ_JSON_QUESTIONS_WITH_SOLUTION:1}).lean();
            let UsersArrayJson=await SUBMISSION_QUESTION_COLLECTION.find({QUIZ_CREATOR_NAME:req.params.CreatorName,QUIZ_UNIQUE_IDENTIFIER:req.params.QuizUniqueIdentifier}).select({QUIZ_SUBMITTER_NAME:1,QUIZ_SUBMITTER_SCORE:1}).sort({QUIZ_SUBMITTER_SCORE:-1}).lean();

            if(UserQuestionJson)
            {
                res.json({ErrCode:0,ResMsg:"Quiz successfully Fetched",UserQuestionJson:UserQuestionJson.QUIZ_JSON_QUESTIONS_WITH_SOLUTION,AttemptedUserJsonArray:UsersArrayJson});
            }
            else
            {
                res.json({ErrCode:1,ResMsg:"No Quiz found for user",UserQuestionJson:null,AttemptedUserJsonArray:null});
            }



            
        }
    }

    catch(err)
    {
        res.json({ErrCode:2,ResMsg:err.message,UserQuestionJson:null,AttemptedUserJsonArray:null});
    }

});

module.exports=router;