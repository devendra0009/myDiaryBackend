const User = require('../models/User');

const getUser = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const user = await User.findById(userId, { name: 1, email: 1 }); //means userId i get from middleware, find it, and select that whole user except its password
    // console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error occured!!');
  }
};

module.exports = {
  getUser,
};
