const router = require("express").Router();
const ctrl = require("../controllers/authController");

router.post("/register", ctrl.register);
router.get("/verify/:id", ctrl.verify);
router.post("/login", ctrl.login);
router.post("/verify-otp", ctrl.verifyOtp);

module.exports = router;