var express    =require("express"),
    router     =express.Router({mergeParams:true});
    Campground =require("../model/campgrounds.js"),
    Comment    =require("../model/comments.js");
    middleware =require("../middleware/index.js");
//======================================//    
//COMMENTS ROUTES
//======================================//
router.get("/comments/new",middleware.isLoggedIn, function(req,res) {
  Campground.findById(req.params.id,function(err,campground) {
    if(err){
       req.flash("error",err.message);
       res.redirect("back");
    }else{
res.render("comments/new",{campground:campground});
}
});
});
router.post("/comments",middleware.isLoggedIn,function(req,res) {
var comment =req.body.comment;
Campground.findById(req.params.id,function(err,campground) {
if(err){
   req.flash("error",err.message);
       res.redirect("back");
}else {
  Comment.create(comment,function(err,comment) {
    if(err){
       req.flash("error","Failed to create comment!");
       res.redirect("back");
    }else {
      comment.author.id=req.user._id;
      comment.author.username=req.user.username;
      comment.save();
      req.flash("success","Comment created successfully!");
        campground.comments.push(comment._id);

        campground.save(); 
        res.redirect("/campgrounds/"+req.params.id);
    }
  });
}
});
});
router.get("/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res) {
  Comment.findById(req.params.comment_id,function(err,foundcomment) {
          if(err){
      req.flash("error",err.message);
       res.redirect("back");
    }else {
     res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
    }
  });
});
router.put("/comments/:comment_id",middleware.checkCommentOwnership, function(req,res) {
Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment) {
  if(err){
    req.flash("error",err.message);
       res.redirect("back");
  }else{
   req.flash("success","comment updated successfully!");        
    res.redirect("/campgrounds/"+req.params.id);
  }
});
});
router.delete("/comments/:comment_id",middleware.checkCommentOwnership,function(req,res) {
Comment.findByIdAndRemove(req.params.comment_id,function(err) {
  if(err){
    req.flash("error",err.message);
       res.redirect("back");
     }else{
      req.flash("success","comment removed successfully!");
  res.redirect("/campgrounds/"+req.params.id);
}
});
});
module.exports=router;






