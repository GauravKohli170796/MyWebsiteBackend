const express = require("express");
const router = express.Router();
const axios=require("axios").default;
let LOVE_CALCULTOR_COLLECTION=require("../models/LOVE_CALCULTOR_COLLECTION");

router.post("/FindLoveDetails",async function(req,res){
    try
    {
        if(!(req.body.FirstName && req.body.SecondName))
        {
            res.json({ErrCode:1,ResMsg:"Invalid Request Parameters",LoveInfoDetailsJson:null});
            return;
        }
        var options = {
            method: 'GET',
            url: 'https://love-calculator.p.rapidapi.com/getPercentage',
            params: {fname: req.body.FirstName, sname: req.body.SecondName},
            headers: {
              'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
              'x-rapidapi-key': 'a1fe7592cbmshee6bb28405febdfp1bd042jsne5d47a9cd594'
            }
          };
          
       let LoveCalculatorJsonResult=await axios.request(options);
       if(Object.keys(LoveCalculatorJsonResult.data).length)
       {
            await LOVE_CALCULTOR_COLLECTION({FIRST_NAME:req.body.FirstName,SECOND_NAME:req.body.SecondName},{FIRST_NAME:req.body.FirstName,SECOND_NAME:req.body.SecondName,LOVE_PERCENTAGE_RESULT:LoveCalculatorJsonResult.data.percentage},{upsert:true});
            res.json({ErrCode:0,ResMsg:"Successfully calculated love percentage",LoveInfoDetailsJson:LoveCalculatorJsonResult.data});
            return;
       }
       else
       {
            res.json({ErrCode:1,ResMsg:"failed to calculate love percentage",LoveInfoDetailsJson:null});
            return;
       }
    }

    catch(err)
    {
        res.json({ErrCode:2,ResMsg:err.message,LoveInfoDetailsJson:null});
    }
});


module.exports=router;