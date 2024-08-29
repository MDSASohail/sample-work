const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors')
const env=require('dotenv');
const user=require('./Routes/User');
const expense=require('./Routes/Expense');
env.config();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
async function connectToDatabase()
{
    try {
        await mongoose.connect(process.env.mongo_pass);
        console.log("Connected to database successfully");

    } catch (error) {
        console.log("Error in connecting to database",error.message);
    }
}
connectToDatabase();

app.use('/user',user);
app.use('/expense',expense);




app.get('*',(req,res)=>{
    res.send("Page not found");
})

app.listen(8000,()=>{
    console.log("Server is started");
})