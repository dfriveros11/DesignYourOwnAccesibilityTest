const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Se puede utilizar passport sin tener que utilizar mongoose ya que no está permitido para la clase sadly :(

const userSchema = new Schema({
  username: String,
  googleId: String,
  userType: Boolean,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
