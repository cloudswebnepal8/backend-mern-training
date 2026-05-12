const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE PROFILE (NO PASSWORD CHANGE)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};

// UPLOAD PROFILE IMAGE
exports.uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: req.file.filename },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch {
    res.status(500).json({ msg: "Upload failed" });
  }
};