const User = require('../models/User'); //so that we can make the user according to userSchema
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  // console.log(reqJWT_SECRET = "5JSD@$4".body);
  let success = false;

  try {
    //finding if the user with this email already exist or not??
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: 'Sorry a user with this email already exist!!' });
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt); //awatied since it returns a promise
    //this will directly add the inputted data to database
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePass,
    });

    let data = {
      user: {
        id: user.id,
      },
    };

    //authToken user ki id se ban dia added with our JWT_SECRET
    let authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({ success, authToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Some error occured');
  }
};

const loginUser = async (req, res) => {
  // console.log(req.body);

  let success = false;

  const { email, password } = req.body;
  try {
    //finding if the user with this email already exist or not??
    let user = await User.findOne({ email }); //using es6 just write email it will automatically assign it the user's email value
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Please Enter valid credentials!!' }); //agr user with same mail exists so just throw this error
    }

    const passwordComp = await bcrypt.compare(password, user.password); //compare the entered password with the existing user's password

    //agr password match nhi krta to
    if (!passwordComp) {
      return res
        .status(400)
        .json({ error: 'Please Enter valid credentials!!' });
    }

    let data = {
      user: {
        id: user._id,
        // email: user.email
      },
    };
    let authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({ success, authToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server error occured!!');
  }
};

module.exports = {
  createUser,
  loginUser,
};
