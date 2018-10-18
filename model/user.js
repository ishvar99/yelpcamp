var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var userSchema=new mongoose.Schema({
username:"String",
firstName:"String",
lastName:"String",
email:"String",
date:"String",
password:"String",
nationality:"String"
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);