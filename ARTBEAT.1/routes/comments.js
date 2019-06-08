var express = require("express");
var router  = express.Router({mergeParams: true});
var Painting = require("../models/painting");
var Comment = require("../models/comment");
var middleware= require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Painting.findById(req.params.id, function(err, painting){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {painting: painting});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup painting using ID
   Painting.findById(req.params.id, function(err,painting){
       if(err){
           console.log(err);
           res.redirect("/paintings");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               ////////////////////
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               
               painting.comments.push(comment);
               painting.save();
               req.flash("success","Comment Added!");
               res.redirect('/paintings/' + painting._id);
           }
        });
       }
   });
});
// //EDIT AND UPDATE ROUTES

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res)
{ Comment.findById(req.params.comment_id,function(err, foundComment)
    {
        if(err)
        {
            req.flash("error","Something went wrong");
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{painting_id: req.params.id,comment: foundComment});
        }
    });
});


router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Painting.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment)
  {
      if(err)
      {
          req.flash("error","Something went wrong");
          res.redirect("back");
      }
      else{
          res.redirect("/paintings/"+req.params.id);
      }
  });
    
});
//DELETE ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          req.flash("error","Something went wrong");
          res.redirect("back");
      }
      else
      {
          res.redirect("/paintings/"+ req.params.id);
      }
  });
});

module.exports = router;