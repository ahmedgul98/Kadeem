var mongoose = require("mongoose");
var Painting = require("./models/painting");
var Comment   = require("./models/comment");

var data = [
    {
        name: "UnderWater", 
        image: "https://mymodernmet.com/wp/wp-content/uploads/2018/07/oil-painting-underwater-paintings-isabel-emrich-6.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Abstract", 
        image: "https://5.imimg.com/data5/FW/TM/MY-2420068/designer-abstract-painting-500x500.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Thoughts", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-F9zPMCYcn-yj0pH39zdiEB9VxcD53aM9jYSv97tkSdE8nFNWIA",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all paintings
   Painting.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed paintings!");
        //  //add a few paintings
        // data.forEach(function(seed){
        //     Painting.create(seed, function(err, painting){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a painting");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "Great painting",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         painting.comments.push(comment);
        //                         painting.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
     }); 
//     add a few comments
}

module.exports = seedDB;
