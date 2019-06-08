var Painting = require("../models/painting");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkPaintingOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Painting.findById(req.params.id, function(err, foundPainting){
           if(err){
                req.flash("error","Painting not found");
               res.redirect("back");
           }  else {
               
            if(foundPainting.author.id.equals(req.user._id)||req.user.isAdmin) {
                next();
            } else {
                req.flash("error","Not permitted");
                res.redirect("back");
            }
           }
        });
    } else {
         req.flash("error","first log in");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error","Not Found");
               res.redirect("back");
           }  else {
               
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","Not permitted");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","first log in");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to login inorder to proceed!");
    res.redirect("/login");
};

module.exports = middlewareObj;