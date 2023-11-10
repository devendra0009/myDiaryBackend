//fetching user using authhToken  and returning its details at the getUser endpoint
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//  console.log(process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token'); //abhi k lie m auth token header(jha pr hm content-type vgera likhthe hai) me dalra hu
  //  console.log(token);
  if (!token) {
    res.sendStatus(401).json({ error: 'Please enter a valid token' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); //verifies the token and returns if it is valid or not
    //  console.log(data);
    req.user = data.user;
    next(); //this is the function where i am sending the details of the user
  } catch (error) {
    res.sendStatus(401).json({ error: 'Please enter a valid token' });
  }
};

module.exports = fetchuser;
