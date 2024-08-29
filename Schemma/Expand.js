const mongoose=require('mongoose');
const ExpandScheema=new mongoose.Schema({
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    userId:{type:String,required:true},
    category:{type:String,required:true}
},{timestamps:true});

module.exports=mongoose.model("Expend List",ExpandScheema);