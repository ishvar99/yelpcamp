var express                  =require("express"),
    app                      =express(),
    passport                 =require("passport"),
    session                  =require("express-session"),
    passportLocalMongoose    =require("passport-local-mongoose"),
    localStrategy            =require("passport-local"),
    bodyParser               =require("body-parser"),
    mongoose                 =require("mongoose"),
    seed                     =require("./seed.js"),
    flash                    =require("connect-flash"),
    User                     =require("./model/user.js"),
    methodOverride           =require("method-override");

var commentRoutes            =require("./routes/comments.js"),
    campgroundsRoutes        =require("./routes/campgrounds.js"),
    indexRoutes              =require("./routes/index.js");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});
app.use(express.static(__dirname+"/public"));
app.use(session({
  secret:"Anything",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));              
app.use(flash());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended: true}));
//middleware that will work on all routes
//to define currentUser in header.ejs
app.use(function(req,res,next) {
res.locals.currentUser=req.user;
res.locals.error=req.flash("error");
res.locals.success=req.flash("success");
next();
});
app.use("/campgrounds/:id",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use(indexRoutes);
// Campground.create({
//    name:"Devon,England",
//    image:"address.jpg",
//    description:"It is one of the most beautiful campgrounds"},
//    function(err, campground) {
//    if(err){
//       console.log("Something went wrong!!");
//    }
// });
app.set("view engine","ejs");
//seed();
app.listen(process.env.PORT,process.env.IP,function() {
	console.log(" The YelpCamp Server has started!");
});