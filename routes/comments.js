var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");



//===============comments route===========//
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            req.flash("error","Something went wrong");
            console.log(err);
        }else{
           res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
   Campground.findById(req.params.id,function(err, campground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   comment.author.id=req.user._id;
                   comment.author.username=req.user.username;
                   //save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success","Comment created");
                   res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
   }) ;
});
//edit comment
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComments) {
        if(err){
            res.redirect("bak");
        }else{
             res.render("comments/edit",{campground_id:req.params.id,comment:foundComments}) ;
        }
    });
});
//comment update==
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   }) ;
});

//delete comment route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});



module.exports= router;