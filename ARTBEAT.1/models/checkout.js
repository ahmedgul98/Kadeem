var mongoose = require("mongoose");

var checkoutSchema = mongoose.Schema({
    name: String,
    phoneNumber:Number,
    Email:String,
    Address:String
    // author:{
    //     id:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username: String
    // }
});

module.exports = mongoose.model("Checkout", checkoutSchema);