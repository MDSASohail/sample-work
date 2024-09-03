const mongoDB=require('mongoose');

const TotalSchemma=new mongoDB.Schema({
    Expense:{type:Number},
    Income:{type:Number},
    Balance:{type:Number},
    userId:{type:String}
},{timestamps:true});
module.exports=mongoDB.model("Total",TotalSchemma);