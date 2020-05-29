const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//  John no aconseja usar Mongoose, pero no sè si sea necesario para Google :)

const userSchema = new Schema({
  username: String,
  googleId: String,
  userType: Boolean,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
