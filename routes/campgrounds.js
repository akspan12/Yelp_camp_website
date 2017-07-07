var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
var geocoder = require('geocoder');



//========campground routes========
//index
router.get("/campgrounds",function(req,res){
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds});
            }
        });
});

//create
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
     var name=req.body.name;
     var image=req.body.image;
     var desc=req.body.description;
     var price=req.body.price;
     var author={
       id:req.user._id,
       username:req.user.username
     };
     
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;

     var newCampground={name:name,price:price,image:image,description:desc,author:author,location: location, lat: lat, lng: lng};
     Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
     });
     });
});

//new
router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

//show
router.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground:foundCampGround});
        }
    });
});


//===edit campgrounds====
//show
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
         Campground.findById(req.params.id,function(err,foundCampGround){
             req.flash("error","Campground not found");
                 res.render("campgrounds/edit",{campground:foundCampGround});   
    });
});
//==update==
router.put("/campgrounds/:id",function(req,res){
    
   geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.campground.name, cost: req.body.campground.price,location: location, lat: lat, lng: lng,image: req.body.campground.image, description: req.body.campground.description };
    Campground.findByIdAndUpdate(req.params.id, {$set:newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//=======destroy campground route==========
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
             res.redirect("/campgrounds");
       }
   });
});


module.exports= router;