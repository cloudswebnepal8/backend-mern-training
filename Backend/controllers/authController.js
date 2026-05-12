const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mailer");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  const link = `http://localhost:5000/api/auth/verify/${user._id}`;

  await sendEmail(email, "Verify Account", `<a href="${link}">Click to Verify</a>`);

  res.json({ msg: "Check email to verify" });
};

// VERIFY EMAIL
exports.verify = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isVerified: true });
  res.send("Account Verified");
};

// LOGIN (SEND OTP)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isVerified) return res.status(400).json({ msg: "Invalid" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendEmail(email, "Your OTP", `<h1>${otp}</h1>`);

  res.json({ msg: "OTP sent" });
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (user.otp !== otp || user.otpExpire < Date.now())
    return res.status(400).json({ msg: "Invalid OTP" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30m"
  });

  res.json({ token });
};