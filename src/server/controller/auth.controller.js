const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require("../model/userSchema");
const connectDB = require('../database/connection');



exports.signin = (req, res) => {
    try{
        let token;
        const{ email, password } = req.body; 
        if(!email || !password){
            return res.status(400).json({
                error : "Please enter all the credentials"
            })
        }
        const userLogin = User.findOne({email : email});

        if(userLogin){
           const isMatch = bcrypt.compare(password, userLogin.password);
// ----------------------
        //    token = userLogin.generateAuthToken();
        //    console.log(token);

        //    res.cookie("jwtoken", token, {
        //        expires : new Date(Date.now() + 25892000000),
        //        httpOnly : true
        //    })

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
}

exports.signup = async (req, res) => {

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

}


exports.logout = (req, res) => {
    console.log(`Logout page`);
    res.clearCookie('jwtoken', {path : '/'});
    res.status(200).send('User LogOut');
}
