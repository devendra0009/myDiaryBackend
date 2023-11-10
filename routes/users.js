const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const { getUser } = require('../controllers/users');
const router = express.Router();

//making an endpoint to getUser using a token and converting that token into user details using a middleware
router.get('/getUser', fetchuser, getUser);

module.exports = router;
