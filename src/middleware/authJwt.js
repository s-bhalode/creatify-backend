const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/user.model');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({message : "No token provided !"});
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message : "Unauthorized !"});
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }
        User.find(
            {
                _id : {$in: user._id}
            },
            (err, role) => {
                if(err){
                    res.status(500).send({message : err});
                    return;
                }    
                if(role === "admin"){
                    next();
                    return;
                }
                res.status(403).send({message : "Admin Role !"});
                return ;
            }
        );
    });
};


isRecruiter = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }
        User.find(
            {
                _id : {$in: user.id}
            },
            (err, role) => {
                if(err){
                    res.status(500).send({message : err});
                    return;
                }    
                if(role === "recruiter"){
                    next();
                    return;
                }
                res.status(403).send({message : "Recruiter Role !"});
                return ;
            }
        );
    });
};


isDesigner = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }
        User.find(
            {
                _id : {$in: user._id}
            },
            (err, role) => {
                if(err){
                    res.status(500).send({message : err});
                    return;
                }    
                if(role === "designer"){
                    next();
                    return;
                }
                res.status(403).send({message : "Designer Role !"});
                return ;
            }
        );
    });
};


const authJwt = {
    verifyToken,
    isAdmin,
    isRecruiter,
    isDesigner
};

module.exports = authJwt;