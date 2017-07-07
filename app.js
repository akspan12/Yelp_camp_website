var express         =require("express"),
    app             =express(),
    bodyParser      =require("body-parser"),
    mongoose        =require("mongoose"),
    flash           =require("connect-flash"),
    passport        =require("passport"),
    localStrategy   =require("passport-local"),
    methodOverride  =require("method-override"),
    User            =require("./models/user"),
    seedDB          =require("./seeds");
    
var commentRoutes     =require("./routes/comments"),
    campgroundRoutes  =require("./routes/campgrounds"),
    indexRoutes       =require("./routes/index");
    


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');  
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"dark matter is a complex magnificient matter that can be both destructive and constructive",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


//=================================================================
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp server");
});