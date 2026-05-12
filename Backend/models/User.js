const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  profilePic: { type: String, default: "" },
  otp: String,
  otpExpire: Date
});

module.exports = mongoose.model("User", userSchema);