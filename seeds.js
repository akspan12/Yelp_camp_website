var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
      {
        name:"nainital",
        image:"https://images.pexels.com/photos/27865/pexels-photo-27865.jpg?h=350&auto=compress&cs=tinysrgb",
        description:"Hidden Valley Adventure Camp Nainital, Pangot, Uttarakhand, offers you a stay in jungle or forest camping adjacent to village and farms. Campsite has Swiss tents with attached washroom / toilet and Alpine tents with cot bedding for a comfortable stay. Nainital camp is a Nature or Eco camp with Bamboo Restaurant. Our couple and family friendly camps offers a varity of adventure sports and activities. A great place for school and college with a large campground for team activities and music"
      },
      {
        name:"shimla",
        image:"https://images.pexels.com/photos/33983/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb",
        description:"Hidden Valley Adventure Camp Nainital, Pangot, Uttarakhand, offers you a stay in jungle or forest camping adjacent to village and farms. Campsite has Swiss tents with attached washroom / toilet and Alpine tents with cot bedding for a comfortable stay. Nainital camp is a Nature or Eco camp with Bamboo Restaurant. Our couple and family friendly camps offers a varity of adventure sports and activities. A great place for school and college with a large campground for team activities and music"
      },
       {
        name:"manali",
        image:"https://images.pexels.com/photos/48638/pexels-photo-48638.jpeg?h=350&auto=compress&cs=tinysrgb",
        description:"Hidden Valley Adventure Camp Nainital, Pangot, Uttarakhand, offers you a stay in jungle or forest camping adjacent to village and farms. Campsite has Swiss tents with attached washroom / toilet and Alpine tents with cot bedding for a comfortable stay. Nainital camp is a Nature or Eco camp with Bamboo Restaurant. Our couple and family friendly camps offers a varity of adventure sports and activities. A great place for school and college with a large campground for team activities and music"
      },
      {
        name:"trivund",
        image:"https://farm9.staticflickr.com/8193/8077900378_baca41b1fd.jpg",
        description:"Hidden Valley Adventure Camp Nainital, Pangot, Uttarakhand, offers you a stay in jungle or forest camping adjacent to village and farms. Campsite has Swiss tents with attached washroom / toilet and Alpine tents with cot bedding for a comfortable stay. Nainital camp is a Nature or Eco camp with Bamboo Restaurant. Our couple and family friendly camps offers a varity of adventure sports and activities. A great place for school and college with a large campground for team activities and music"
      }
    ];


function seedDB(){
    //remove campgrounds
    Campground.remove({},function(err){
//     if(err){
//         console.log(err);
//     }else
//     console.log("removed campgrounds");
//      //add campgrounds
//     data.forEach(function(seed){
//       Campground.create(seed,function(err,campground){
//           if(err){
//               console.log(err);
//           }else{
//               console.log("added one");
//               //create campground
//               Comment.create(
//                   {
//                       text:"awesome place but costly but no convinience",
//                       author:"akshansh"
//                   },function(err,comment){
//                       if(err){
//                           console.log(err);
//                       }else{
//                           campground.comments.push(comment);
//                           campground.save();
//                           console.log("new comments"); 
//                       }
//                   });
//           }
//       });
//   });
   });
}

module.exports=seedDB;
