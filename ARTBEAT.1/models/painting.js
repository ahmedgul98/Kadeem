var mongoose = require("mongoose");

var paintingSchema = new mongoose.Schema({
   name: String,
   price: Number,
   image: String ,
   description: String,
   author:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Painting", paintingSchema);