const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try{

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ _id : verifyToken._id, "tokens.token" : token });

        if(!rootuser){
            throw new Error('User Not Found');
        }
        req.token = token;
        req.user = user;

        next();

    }catch(err){
        res.status(401).send('Unauthorized : No token provided');
        console.log(err);
    }
}

module.exports = authenticate;