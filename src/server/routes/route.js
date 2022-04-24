const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/auth");

const connectDB = require('../database/connection');
const User = require("../model/userSchema");
const { route } = require('express/lib/application');

router.get('/', (req, res) => {
    res.send("hello users!! welcome to creatify");
});

// signUp route
router.post('/register', async (req, res) => {
    // console.log(req.body);
    // res.send(`SIGN UP`);
    // res.json(req.body);

    const {username, email, password} = req.body;

    if(!username || !password){
        return res.status(422).json({
            error : "Plz fill the fields properly"
        })
    }

    try{
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(422).json({
                error : "Email already exists"
            });
        }

        const user = new User({username, email, password});

        const userRegister = await user.save();
        
        // await user.save()
        // res.status(201).json({
        //     message : "user registered successfully"
        // });

        console.log(`${user} user registered successfully`);
        console.log(userRegister);
        
        if(userRegister){
            res.status(201).json({
                message : "user registered successfully"
            });
        }else{
            res.status(201).json({
                error : "Failed to register"
            })
        }
    }catch(err){
        console.log(err);
    }

});

// login route
router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({
    //     message : "successfully loged in"
    // })

    try{
        let token;
        const{ email, password } = req.body; 
        if(!email || !password){
            return res.status(400).json({
                error : "Please enter all the credentials"
            })
        }
        const userLogin = await User.findOne({email : email});

        // console.log(userLogin);

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

           token = await userLogin.generateAuthToken();
           console.log(token);

           res.cookie("jwtoken", token, {
               expires : new Date(Date.now() + 25892000000),
               httpOnly : true
           })

            if(!isMatch){
                res.status(400).json({
                    error : "Invalid Credentials"
                })
            }else{
                res.json({
                    message : "User Logged in successfully"
                })
            }
        }else{
            res.status(400).json({
                error : "Invalid credentials"
            })
        }
    }catch(err){
        console.log(err);
    }


})

// Dashboard route
router.get('/dashboard', authenticate, async (req, res) => {
    res.send("USER_DASHBOARD");
})

// LogOut route
router.get('/logout', (req, res) => {
    console.log(`Logout page`);
    res.clearCookie('jwtoken', {path : '/'});
    res.status(200).send('User LogOut');
})

module.exports = router;