var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var User = require("./models/user");
var steps = require("./models/items");

// var multer = require('multer');


var userApi = require('./routes/userApi');
var otherApi = require('./routes/otherApi');

// var storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null , __dirname + "/public/uploads")
//     },
//     filename : function(req, file, cb){
//          var datetimestamp = Date.now();
//          cb(null, file.fieldname + '-'  + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
// }
    
// });

// var upload = multer({
//     storage : storage
// }).single('file');

var app = express();
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", " *");
  res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-with,Content-Type,Accept");
  next();
});

app.use('/api', userApi);
// app.use('/api', otherApi);

app.get("/read_item", function (req, res) {
    steps.find({}, function (err, main) {
        if (err) throw err;
        console.log(main);
        console.log("Im here");
        res.status(200).send(main);
    });
});

app.get("/readProfile",function(req,res){
    User.find({}, function (err, main) {
       if (err) throw err;
          res.status(200).send(main);
      });
});

app.post("/read_data",function(req,res){
var recipe = req.body;
var newRecipe = new steps({
            title:recipe.title,
            username:recipe.username,
            discription:recipe.discription,
            step0:recipe.step0,
            step1:recipe.step1,
            step2:recipe.step2,
            step3:recipe.step3,
            step4:recipe.step4,
            step5:recipe.step5,
            step6:recipe.step6,
            rate: recipe.rate,
            imagePath1:recipe.imagePath1,
            imagePath2:recipe.imagePath2,
            imagePath3:recipe.imagePath3,
            imagePath4:recipe.imagePath4,
            imagePath5:recipe.imagePath5,
            imagePath6:recipe.imagePath6
            });
            newRecipe.save(function(err){
              if (err) return handleError(err);
            });
            res.status(200).send("Successfully Added")
});



app.post("/submit_task",function(req , res){
    console.log('called');
  upload(req,res,function(err){
       if(err){
           res.json({success : false , msg:"file uploaded failed"});
           return;
       }  
       console.log(req.file);
       console.log(req.file.path);
       res.json({success:true , msg:"file uploaded succesfully"});
});

});



app.get("/remove_item",function(req,res){
var remove = req.query['remove'];
steps.deleteOne({ _id:remove }, function (err) {
    if (err)throw err;
    res.status(200).send("Successfully deleted");
});
});

app.put('/update_rate/:recipe_id', function(req, res) {
    console.log('-----******************************-----');
    var recipe_id = req.params['recipe_id'];
    // console.log(recipe_id);
    var new_rating = req.body['new_rate'];
    steps.findByIdAndUpdate(
        recipe_id, {rate: new_rating}, function(err, recipe) {
            if (err) outputMessageAndEndResponse(res, 'database error occured!');
            else if (!recipe) outputMessageAndEndResponse(res, 'couldn not find recipe!');
            else outputMessageAndEndResponse(res, 'successfully updated rating!');
        });
});

function outputMessageAndEndResponse(res, msg) {
    console.log(msg);
    res.end();
}
app.listen(3000);

















//  var first_one = steps({
//     title:'title',
//     username:'mike',
//     discription:'This is really tasty meal you can taste it right now',
//     step0:'String',
//     step1:'String',
//     step2:'String',
//     step3:'String',
//     step4:'String',
//     step5:'String',
//     rate:2,
//     imagePath:'/assets/images/image7.jpg'
//  });

// first_one.save(function(err){
//    if (err) return handleError(err);
//  });



