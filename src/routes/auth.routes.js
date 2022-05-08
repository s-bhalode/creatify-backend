const verifySignUp = require("../middleware/verifySignUp");
const controller = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

module.exports = function(app){
    
    app.post("/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);

    app.post("/api/auth/signin", controller.signin);
};

