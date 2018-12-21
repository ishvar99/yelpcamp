var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
	text:String,
	author:{
		id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
		},
		username: String
	},
	date:{type:Date,default:new Date()}
});
module.exports=mongoose.model("comment",commentSchema);//name of the model is 'comment'
