var mongoose=require("mongoose");
var CampgroundSchema=new mongoose.Schema({
name:String,
location:String,
author:
{
	id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"User"
},
username:String
},
image: String,
description:String,
comments:[
   {
	type:mongoose.Schema.Types.ObjectId,
	ref:"comment"   //name of comment model
   }
]
});
module.exports=mongoose.model("Campground",CampgroundSchema);
