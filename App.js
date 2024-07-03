const express=require('express');
const mongoose=require('mongoose');
const app=express();
const env=require('dotenv');
const cryptojs=require('crypto-js');
const userSchemma=require('./Schemma/UserSchemma');
env.config();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
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
app.get('/',(req,res)=>{
    res.send("Hello");
})


app.post('/',async (req,res)=>{
    // console.log("In body ",req.body)
    const encryptedPassword=cryptojs.AES.encrypt(req.body.password,process.env.key).toString();
    console.log(req.body.password,encryptedPassword);
    const details=new userSchemma({
        fullName:req.body.fullName,
        email:req.body.email,
        password:encryptedPassword
    })

    try {
        const savedDetail=await details.save();
        res.status(200).json(savedDetail);
    } catch (error) {
        console.log("Error is ",error.message)
        res.status(500).json(error);
    }
})



app.get('/',(req,res)=>{
    try {
        const getDetail=userSchemma.findOne({email:req.body.email});
        if(getDetail===null)
            {
                res.status(404).json({result:"User not found"});
                return;
            }
        // const decpriptedPassword=getDetail.password
        console.log(getDetail);
        res.send("Hello")
    } catch (error) {
        res.send("Error in getting user Detail",error.message);
    }
})

app.get('*',(req,res)=>{
    res.send("Page not found");
})

app.listen(8000,()=>{
    console.log("Server is started");
})