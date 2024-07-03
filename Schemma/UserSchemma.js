const mongoose=require('mongoose');
const userSchemma=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true});
module.exports=mongoose.model("allUserDetails",userSchemma);