const config = require("./Constants/config");
let MongoDbConn = require("./DataBase/MongoDbConn");
const express=require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT=process.env.PORT || config.Port;
let QuizHandlerRoute=require("./routes/QuizHandlerRoute")

async function AppStart() {
    var CMongoDbConn = new MongoDbConn(config.MongoDB).getInstance();
  
    try {
      //connect to mongo instance
      await CMongoDbConn.ConnectDb();
    } catch (err) {
      console.log("Error while Connecting Mongo DB" + err.message);
    }
  
     //Destroy Mongoose connection on process exit by ctrl+c
     process.on("SIGINT", function () {
      CMongoDbConn.DisconnectDb();
    });




  app.use(cors({
        origin:config.UI_SERVER_URL,
        credentials:true
    })); 

  app.use("/Quiz",QuizHandlerRoute);  



  //To handle any type of request which is not handled by any above routes
  app.use("*",function(req,res)
  {
    let ObjErrorResponse={};
    ObjErrorResponse.ErrCode=404;
    ObjErrorResponse.ResMsg="This request is not handled by any routes";
    res.status(404).send(ObjErrorResponse);
    console.log(`Request is received with url ${req.originalUrl} which is not handled by any of routes`);
  });

//To handle any error in route which is not handled by route itself
  app.use(function (err, req, res, next) {
    let ObjErrorResponse={};
    ObjErrorResponse.ErrCode=9999;
    ObjErrorResponse.ResMsg=err.message;
    console.log(`Unhandled Error in ${req.originalUrl} route:- ${err.message}`);
    res.send(ObjErrorResponse);
  });


//Make server listening on specific port and handling its error if port is not available.
app.listen(PORT,  () => {
    console.log("HTTPS Server listening on Port " + config.Port);
  }).on('error', function (err) {
    console.log(`Error in hosting  :- ${err.message}`);
})

   }
  
  AppStart();
  