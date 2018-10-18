var express   =require("express"),
    router    =express.Router(),
    User      =require("../model/user.js"),
    passport  =require("passport");


router.get("/",function(req,res) {
res.render("campgrounds/home");
});
//=====================
//Authentication Routes
//=====================
//Register Route
router.get("/admin",function(req,res) {
res.send("ADMIN BLOCK");
});
router.get("/register",function(req,res) {
  res.render("authentication/register");
});
router.post("/register",function(req,res) {
  var newUser=new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    username:req.body.username,
    email:req.body.email,
    date:req.body.date,
    nationality:req.body.nationality
  });
User.register(newUser,req.body.password,function(err,user) {
  if(err){
    req.flash("error",err.message);
    return res.render("authentication/register");
  }
  passport.authenticate("local")(req,res,function() {
    req.flash("success","Successfully signed in!");
    res.redirect("/campgrounds");
  });
});
});
//Login Route
router.get("/login",function(req,res) {
res.render("authentication/login");
});
router.post("/login",passport.authenticate("local",{
  failureFlash: "Invalid username or password.",
  successFlash:"Successfully, logged in!" ,
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(req,res) {
});
// Logout Route
router.get("/logout",function(req,res) {
req.logout();
 req.flash("success","Successfully, logged out!");
res.redirect("/campgrounds");
});
router.get("/users/:username",function(req,res) {
User.find({
  username:req.params.username
},function(err,user) {
  if(err){
    req.flash("error",err.message);
      res.redirect("back");
  }else {
    res.render("users/show",{user:user});
  }
});
});
module.exports=router;