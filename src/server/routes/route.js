const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth");
const controller = require('../controller/auth.controller');

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