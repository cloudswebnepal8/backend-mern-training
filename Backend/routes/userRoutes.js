const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  uploadProfilePic
} = require("../controllers/userController");
const upload = require("../middleware/upload");

// GET PROFILE
router.get("/profile", auth, getProfile);

// UPDATE PROFILE (name, email only)
router.put("/update", auth, updateProfile);

// UPLOAD PROFILE IMAGE
router.post("/upload", auth, upload.single("image"), uploadProfilePic);

module.exports = router;