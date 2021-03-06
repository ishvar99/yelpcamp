require('dotenv').config();
var express                  =require("express"),
    app                      =express(),
    helmet                   =require("helmet"),
    passport                 =require("passport"),
    session                  =require("express-session"),
    passportLocalMongoose    =require("passport-local-mongoose"),
    localStrategy            =require("passport-local"),
    bodyParser               =require("body-parser"),
    mongoose                 =require("mongoose"),
    flash                    =require("connect-flash"),
    User                     =require("./model/user.js"),
    methodOverride           =require("method-override");
var commentRoutes            =require("./routes/comments.js"),
    campgroundsRoutes        =require("./routes/campgrounds.js"),
    indexRoutes              =require("./routes/index.js");

// mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});
// mongoose.connect("mongodb://ishan:yelpcamp123@ds135433.mlab.com:35433/yalpcamp",{useNewUrlParser: true}); 
mongoose.connect(process.env.DATABASEURL||"mongodb://localhost/yelp_camp",{useNewUrlParser: true});
app.use(helmet());//for security purpose
app.locals.CDN = "https://unpkg.com/mapbox@1.0.0-beta9/dist/mapbox-sdk.min.js";
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
app.set("view engine","ejs");
app.listen(process.env.PORT||"3000",process.env.IP,function() {
	console.log(" The YelpCamp Server has started!");
});