var Campground=require("../model/campgrounds.js");
var Comment=require("../model/comments.js");
var middlewareobj={};
middlewareobj.checkCampgroundOwnership=function(req,res,next)
{
  if(req.isAuthenticated())
{
   Campground.findById(req.params.id,function(err,foundCampground) 
   {
           if(req.user._id.equals(foundCampground.author.id))
           {
                 if(err){
                  req.flash("error",err.message);
                        res.redirect("back");
                      }
                        
                  else
                      next();
            }
           else{
                req.flash("error","Access Denied! You don't have the permission!");
                res.redirect("/campgrounds/"+foundCampground._id);
              }
  }); 
}
else
{
   req.flash("error","You need to be logged in to do that!");
   res.redirect("/login");
}

  }

 middlewareobj.checkCommentOwnership=function(req,res,next)
{
  if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment) 
         {
          if(err){
             req.flash("error",err.message);
            res.redirect("back");
          }

          else
              {
               if(foundComment.author.id.equals(req.user._id))
               next();

               else{
                req.flash("error","Access Denied! You don't have the permission!");
             }
              }
        });
         }
         else {
             req.flash("error","You need to be logged in to do that!");
             res.redirect("/login");
             } 
 } 
 
 middlewareobj.isLoggedIn=function(req,res,next){
if(req.isAuthenticated()){
  return next();
}
req.flash("error","You need to be logged in to do that!");
res.redirect("/login");
}

module.exports=middlewareobj;