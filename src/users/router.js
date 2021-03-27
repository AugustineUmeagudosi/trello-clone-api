const express = require('express');
const router = express.Router();
const userService = require('./service');

// User registration
router.post( '/register', userService.registration );

// user login
router.post( '/login', userService.login );

module.exports = router;