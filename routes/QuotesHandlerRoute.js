const express = require("express");
const router = express.Router();
const axios=require("axios").default;

router.get("/getRandomQuote",async function(req,res){
    try
    {
        var options = {
        method: 'GET',
        url: 'https://api.quotable.io/random?tags=technology,famous-quotes',
      };
        let QuoteJson=await axios.request(options);
        if(Object.keys(QuoteJson.data).length>0)
        {
          res.json({ErrCode:0,ResMsg:"Successfully fetched the quote.",QuoteJson:QuoteJson.data});
        }
        else
        {
            res.json({ErrCode:1,ResMsg:"Failed to fetch the quote.",QuoteJson:null});
        }

    }

    catch(err)
    {
        res.json({ErrCode:2,ResMsg:err.message,UserQuestionJson:null,QuoteJson:null});
    }

});

module.exports=router;