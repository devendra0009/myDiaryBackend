//our database connected to our myDiary app
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const mongoURI = process.env.DB_URI;
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
     console.log('Connected to Mongoose Successfully');
  });
};
module.exports = connectToMongo;
