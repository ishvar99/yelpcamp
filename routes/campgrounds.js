var express     =require("express"),
    router      =express.Router(),
    Campground  =require("../model/campgrounds.js"),
    middleware  =require("../middleware/index.js"),
    key =process.env.accessToken;      
router.get("/",function(req,res) {
   Campground.find(function(err,campground) {
     if(err){
      req.flash("error",err.message);
      res.redirect("back");
     }
     else{
      res.render("campgrounds/index",{campgrounds:campground});
     }
   })
});
router.post("/",middleware.isLoggedIn ,function(req,res) {
	var name=req.body.name;
	var image=req.body.image;
  var location=req.body.location;
   var description=req.body.description;
   var author={
    id: req.user._id,
    username: req.user.username
   }
	var campground={name:name,image:image,description:description,author:author,location:location};
Campground.create(campground,function(err,campground) {
   if(err){
      req.flash("error","Failed to create campground!");
      res.redirect("back");
   }else{
    req.flash("success","Campground created successfully!");
      res.redirect("/campgrounds");
   } 
});
});
router.get("/new",middleware.isLoggedIn,function(req,res) {
res.render("campgrounds/new");
});
router.get("/:id",function(req,res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
    if(err){
      req.flash("error","Something went wrong!");
      res.redirect("back");
    }else{
      res.render("campgrounds/show",{campground:foundCampground,key:key});
    }
   });
});
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res) {  
  Campground.findById(req.params.id,function(err,foundCampground) {

                 if(err)
                 {
                        req.flash("error","Something went wrong!");
                        res.redirect("/campgrounds");
                      }
                        
                  else
                      res.render("campgrounds/edit",{campground:foundCampground});

  });
});
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res) {
Campground.findByIdAndUpdate(req.params.id,{
  name:req.body.name,
  image:req.body.image,
  description:req.body.description,
  location:req.body.location
},function(err,updatedCampground) {
  if(err){
    req.flash("error",err.message);
    res.redirect("/campgrounds");
  }else{
    req.flash("success", updatedCampground.name+" updated successfully!");
    res.redirect("/campgrounds/"+updatedCampground._id);
  }
})
});
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res) {
Campground.findByIdAndRemove(req.params.id,function(err,removedCampground) {
if(err){
  req.flash("error",err.message);
  res.redirect("/campgrounds");
}else{
  req.flash("success", removedCampground.name+", removed successfully!");
  res.redirect("/campgrounds");
}
});
});
module.exports=router;

