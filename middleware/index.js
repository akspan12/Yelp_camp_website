var Campground=require("../models/campground");
var Comment=require("../models/comment");
//middleware file
var middlewareObject={};

middlewareObject.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
         Campground.findById(req.params.id,function(err,foundCampGround){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("back");
        }else{
            if(foundCampGround.author.id.equals(req.user._id)||req.user.isAdmin){
                next();
            }else{
                req.flash("error","Permission denied");
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error","YOU NEED TO BE LOGGED IN");
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwnership=function(req,res,next){
     if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            if(foundComment.author.id.equals(req.user._id)||req.user.isAdmin){
                next();
            }else{
                req.flash("error","Permission denied");
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error","Login first");
        res.redirect("back");
    }
};

middlewareObject.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","YOU NEED TO BE LOGGED IN");
    res.redirect("/login");
};

module.exports= middlewareObject;