const route=require('express').Router();
const expenseSchemma=require('../Schemma/Expand');
const Total=require('../Schemma/Total');
//Save a expense
route.post('/save',async (req,res)=>{
    try {
        const dataToSave=new expenseSchemma({
            amount:req.body.expense.amount,
            description:req.body.expense.description,
            category:req.body.expense.category,
            userId:req.body.expense.userId

        })
        const savedExpense=await dataToSave.save();
        res.status(200).json({savedExpense:savedExpense});
    } catch (error) {
        res.status(400).json(error.message);
    }

})

//Get all expense list by userId
route.post('/allExpense', async (req, res) => {
    const userId = req.body.userId;
    
    try {
        const allExpense = await expenseSchemma.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json(allExpense);
    } catch (error) {
        res.status(500).json({ error: "Error in fetching all expenses" });
    }
});


// route.post('/total',async(req,res)=>{
//      try {
//         const data= await Total.findOne({userId:req.body.userId});
//         console.log("Get total",data);
//         res.status(200).json(data)
//      } catch (error) {
//         res.status(400).json(error);
//      }
// })


module.exports=route;