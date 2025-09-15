import express from "express";
import { 
    home,
    register, 
    login, 
    profile, 
    verifyOTP, 
    googleLogin, 
    forgotPassword, 
    resetPassword 
} from "../controllers/user-controller.js";   // <-- using the controller we built

const router = express.Router();

//___________________________
// BASIC
//___________________________
router.get("/", home);

//___________________________
// AUTH
//___________________________
router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

//___________________________
// OTP
//___________________________
router.post("/verify-otp", verifyOTP);

//___________________________
// GOOGLE AUTH
//___________________________
router.post("/google-login", googleLogin);

//___________________________
// PASSWORD RESET
//___________________________
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

