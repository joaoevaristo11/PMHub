import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register); // antes era signup
router.post("/login", login);
router.get("/me", authMiddleware, getMe); // nova rota protegida

export default router;
