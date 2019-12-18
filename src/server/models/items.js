var mongoose = require('mongoose');
var schema = mongoose.Schema;

// mongoose.connect("mongodb://127.0.0.1:27017/items");


var item_schema = new schema({
    title:String,
    username:String,
    discription:String,
    step0:String,
    step1:String,
    step2:String,
    step3:String,
    step4:String,
    step5:String,
    rate:Number,
    imagePath1:String,
    imagePath2:String,
    imagePath3:String,
    imagePath4:String,
    imagePath5:String,
    imagePath6:String
},{versionKey: false});
var item = mongoose.model("items",item_schema);
module.exports= item;


