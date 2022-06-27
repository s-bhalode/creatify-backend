const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const authenticate = require("../middleware/auth");
const controller = require('../controller/auth.controller');
=======

const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/auth");
const controller = require('../controller/auth.controller');
const connectDB = require('../database/connection');
const User = require("../model/userSchema");
>>>>>>> authentication

router.get('/', (req, res) => {
    res.send("hello users!! welcome to creatify");
});

// signUp route
router.post('/register', controller.signup);

// login route
router.post('/login',  controller.signin);

// Dashboard route
router.get('/dashboard', authenticate, async (req, res) => {
    res.send("USER_DASHBOARD");
})

// LogOut route
router.get('/logout', controller.logout);

module.exports = router;