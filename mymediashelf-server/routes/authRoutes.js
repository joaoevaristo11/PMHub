import express from "express";
import { register, login, getMe, verifyEmail, resendVerification } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login);
router.get("/me", authMiddleware, getMe); 
router.get("/verify", verifyEmail); 
router.post("/resend-verification", resendVerification);


export default router;
