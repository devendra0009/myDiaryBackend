//this is model of our database
//schema/blueprint of our user, how it should look and be given values

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);
// User.createIndexes();  //so that duplicate users na ajae hmare database me
module.exports = User;
