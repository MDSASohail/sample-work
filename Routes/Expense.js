const route=require('express').Router();
const expenseSchemma=require('../Schemma/Expand');

//Save a expense
route.post('/save',async (req,res)=>{
    console.log('Expense are ',req.body);
    try {
        const dataToSave=new expenseSchemma({
            amount:req.body.expense.amount,
            description:req.body.expense.description,
            category:req.body.expense.category,
            userId:req.body.expense.userId
        })
        const savedExpense=await dataToSave.save();
        console.log(savedExpense);
        res.status(200).json(savedExpense);
    } catch (error) {
        res.status(400).json(error.message);
    }

})

//Get all expense list by userId
route.post('/allExpense', async (req, res) => {
    const userId = req.body.userId;
    
    try {
        // Fetch all expenses for the given user and sort by createdAt in ascending order
        const allExpense = await expenseSchemma.find({ userId: userId }).sort({ createdAt: -1 });
        console.log(allExpense)
        // Send the sorted expenses back in the response
        res.status(200).json(allExpense);
    } catch (error) {
        // Log the error and send a 500 status with an error message
        console.error("Error in fetching allExpense", error.message);
        res.status(500).json({ error: "Error in fetching all expenses" });
    }
});



module.exports=route;