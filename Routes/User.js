const route = require('express').Router();
const bcrypt = require('bcrypt');
const userScheem = require('../Schemma/UserSchemma');
//register User
const saltRount = 5;
route.post('/register', (req, res) => {
    //Converting password into hash
    bcrypt.hash(req.body.userData.password, saltRount, async (err, hash) => {
        // console.log(err)
        if (err) {
            console.log("Error in hasing")
            return res.status(503).json(err.message);
        }
        else {
            //Creating User Scheema
            const userDetail = new userScheem({
                fullName: req.body.userData.fullName,
                email: req.body.userData.email,
                password: hash
            })

            //Saving detail on MongoDB
            try {
                const savedUser = await userDetail.save();
                console.log(savedUser)
                res.status(201).json(savedUser);
            } catch (error) {
                console.log(error.message)
                res.status(500).json(error.message);
            }
        }
    })


})

route.post('/login',async (req,res)=>{
    try {
        const user=await userScheem.findOne({email:req.body.userData.email});
        
        //If user on found
        if(user===null)
        {
            console.log("User does't exist")
            return res.status(404).json({result:"User does't exist"});
        }

        //If user found
        bcrypt.compare(req.body.userData.password,user.password,(err,result)=>{
            if(err)
            {
                console.log("Error in comparing password");
                return res.status(500).json({result:"Error in comparing password"});
            }else if(result)
            {
                console.log("User found and password is correct");
                return res.status(200).json(user);
            }else
            {
                console.log("Wrong password")
                return res.status(401).json({result:"Wrong Password"});
            }
        })
        
    } catch (error) {
        console.log("Error in finding user");
        res.status(500).json({result:"Error in finding user"});
    }
})


route.all('*', (req, res) => {
    res.status(404).send("Resourse in User route not found");
})


module.exports = route;