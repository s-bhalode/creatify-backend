const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const User = require('../models/user.model');

exports.signup = (req, res) => {
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        role : req.body.role,
        bio : req.body.bio,
        skills : req.body.skills,
        portfolio_url : req.body.portfolio_url
    });
    console.log(user);
    user.save((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }
        user.save(err => {
            if(err){
                res.status(500).send({message : err});
                return;
            }
            res.send({message : "User was registered successfully !"});
        });
    });
};


exports.signin = (req, res) => {
    User.findOne({
        email : req.body.email
    })
    .exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }

        if(!user){
            return res.status(404).send({message : "User Not Found"});
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken : null,
                message : "Invalid Password !"
            });
        }
        var token = jwt.sign({id : user.id}, config.secret, {
            expiresIn : 86400 // 24 hours
        })
        
        res.status(200).send({
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role,
            accessToken : token
        });
    });
}

