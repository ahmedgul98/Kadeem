var express = require("express");
var router  = express.Router();
var Painting = require("../models/painting");
var Cart=require("../models/cart");
var Checkout=require("../models/checkout");
var middleware= require("../middleware");
//INDEX - show all painting
router.get("/", function(req, res){
    // Get all paintings from DB
    Painting.find({}, function(err, allPaintings){
      if(err){
          console.log(err);
      } else {
          res.render("paintings/index",{paintings:allPaintings});
      }
    });
});

//CREATE - add new painting to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to paintings array
    var name = req.body.name;
    var image = req.body.image;
    var price= req.body.price;
    var desc = req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newPainting = {name: name, price:price, image: image, description: desc, author:author};
    // Create a new painting and save to DB
    Painting.create(newPainting, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success","Painting added to dashboard!");
            res.redirect("/paintings");
        }
    });
});

//NEW - show form to create new painting
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("paintings/new"); 
});
router.get("/checkout",middleware.isLoggedIn,function(req, res) {
     res.render("paintings/checkout");
})
router.post("/checkout",middleware.isLoggedIn,function(req, res) {
    var name=req.body.cardholdername;
    var phone=req.body.cardnumber;
    var email=req.body.mail;
    var address=req.body.address;
    var newCheckout={name:name,phoneNumber:phone,Email:email,Address:address};
    Checkout.create(newCheckout,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            // req.flash("success","Order Confirmed, You will recieve your product within 7days");
            window.alert("Order Confirmed, You will recieve your product within 7days");
            res.redirect("/paintings");

        }
        
    })
    // res.render("paintings/checkout");
})
router.get("/admin",function(req, res, next) {
  Checkout.find({},function(err,orders){
      if(err){
          console.log(err);
      }else{
          res.render("paintings/admin", {Order:orders});
      }
  })  
})
router.get("/shop",function(req, res,next) {
    if(!req.session.cart){
        res.render("paintings/cart",{products:null});
    }
    var cart=new Cart(req.session.cart);
    res.render("paintings/cart",{products:cart.generateArray(),
        totalPrice:cart.totalPrice
    })
    // res.render("paintings/cart");
})

router.get("/cart/:id",middleware.isLoggedIn,function(req, res) {
    var productId=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart:{});
    Painting.findById(productId,function(err,painting){
        if(err){
            console.log(err);
            res.redirect("/paintings") 
        }
        cart.add(painting,painting.id);
        req.session.cart=cart;
        console.log(req.session.cart);
        res.redirect("/paintings");
    })
});


// SHOW - shows more info about one painting
router.get("/:id", function(req, res){
    //find the paintings with provided ID
    Painting.findById(req.params.id).populate("comments").exec(function(err, foundPainting){
        if(err){
            console.log(err);
        } else {
            //render show template with that painting
            res.render("paintings/show", {painting: foundPainting});
        }
    });
});

//edit and update routes
router.get("/:id/edit",middleware.checkPaintingOwnership,function(req,res){
    /////////////////////////////////////////
    /////////////AUTHORIZATION
   
        Painting.findById(req.params.id,function(err,foundPainting){
            res.render("paintings/edit",{found:foundPainting});
    });
});

router.put("/:id",middleware.checkPaintingOwnership,function(req,res){
  Painting.findByIdAndUpdate(req.params.id,req.body.painting, function(err,updated)
  {
      if(err)
      {
          req.flash("error","Something went wrong");
          res.redirect("/paintings");
      }
      else{
          req.flash("success","Successfully updated");
          res.redirect("/paintings/"+req.params.id);
      }
  });
    
});

//destroy route
router.delete("/:id",middleware.checkPaintingOwnership,function(req,res){
    Painting.findByIdAndRemove(req.params.id, function(err)
    {
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("/paintings");
        }
        else
        {
            req.flash("success","Deleted!");
            res.redirect("/paintings");
        }
        
    });
    
});
module.exports = router;

