const express = require('express');
const {login, register, logout} = require('../controllers/auth.js');

const router = express.Router();

//login route
router.post('/login', login);

//register route
router.post('/register', register);

//logout route
router.post('/logout', logout);

module.exports = router;