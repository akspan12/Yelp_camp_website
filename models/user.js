var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:String,
    avatar:{type:String,default:'http://www.infozonelive.com/styles/FLATBOOTS/theme/images/user4.png'},
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    firstName:String,
    lastName:String,
    email:{type:String,unique:true,required:true},
    isAdmin: {type:Boolean,default:false}
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);
