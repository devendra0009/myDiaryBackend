//what to show on endpoint '/api/auth'
//its like a miniapp

const express = require('express');
const { createUser, loginUser } = require('../controllers/auth');

const router = express.Router();

//endpoint is /api/auth/createuser
router.post('/createuser', createUser).post('/login', loginUser);
//making a login endpoint,Authenticate a user using :POST "/api/auth/login"

module.exports = router;
