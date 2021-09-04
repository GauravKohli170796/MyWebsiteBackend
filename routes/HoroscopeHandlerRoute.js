const express = require("express");
const router = express.Router();
const axios=require("axios").default;

router.post("/TwoDayHoroscope",async function(req,res){
    try
    {
        if(!(req.body.Sign && req.body.Day))
        {
            res.json({ErrCode:1,ResMsg:"Invalid Request Parameters",HoroScopeInfoJson:null});
            return;
        }
        var options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            params: {sign: req.body.Sign, day: req.body.Day},
            headers: {
              'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
              'x-rapidapi-key': 'a1fe7592cbmshee6bb28405febdfp1bd042jsne5d47a9cd594'
            }
          };
       let HoroScopeJson=await axios.request(options);
       if(Object.keys(HoroScopeJson.data).length)
       {
        res.json({ErrCode:0,ResMsg:"Successfully fetched the horoscope details",HoroScopeInfoJson:HoroScopeJson.data});
        return;
       }
       else
       {
        res.json({ErrCode:1,ResMsg:"failed to fetch fetched the horoscope details",HoroScopeInfoJson:null});
        return;
       }
    }

    catch(err)
    {
        res.json({ErrCode:2,ResMsg:err.message,HoroScopeInfoJson:null});
    }
});


module.exports=router;