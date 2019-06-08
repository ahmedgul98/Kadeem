var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    session     = require("express-session"),
    methodOverride= require("method-override"),
    LocalStrategy = require("passport-local"),
    MongoStore    = require("connect-mongo")(session),
    Painting      = require("./models/painting"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

//requring routes
var commentRoutes    = require("./routes/comments"),
    paintingRoutes = require("./routes/paintings"),
    indexRoutes      = require("./routes/index")
    
mongoose.connect("mongodb://localhost/gallery",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(session({
    secret: "KADEEM PROJECT",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:180*60*1000}
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //how to save user in session
passport.deserializeUser(User.deserializeUser());

app.use(function(req ,res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session=req.session;
  next();
});

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error= req.flash("error");
   res.locals.success= req.flash("success");

   next();
});

app.use("/", indexRoutes);
app.use("/paintings", paintingRoutes);
app.use("/paintings/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The Server Has Started!");
});

module.exports = app;
