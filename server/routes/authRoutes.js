const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController")

router.post("/login", authController.handleLogin);
router.post("/geofence", authController.geoFenceLogin);
router.post("/check", authController.userExists);
router.post("/signup/send-otp", authController.sendOTPController);
router.post("/signup/verify-otp", authController.verifyOTPController);
router.post("/signup/newuser", authController.signUpHandler)
router.post("/refresh-token", authController.handleRefreshToken)
router.post("/reset-password", authController.resetPassword)

module.exports = router;
