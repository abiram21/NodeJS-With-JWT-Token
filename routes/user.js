const express = require('express');
const router = express.Router();
const userController = require('../contollers/user');


router.post('/signup',userController.userSignup );

router.post('/login',userController.userLogin )

module.exports = router;