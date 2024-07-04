import express from "express";
import signup, { login, logout } from "../controllers/auth.controller";

const router = express.Router();

// Sign up
router.post("/signup", signup);
// login
router.post("/login", login);
//logout
router.post("/logout", logout);

export default router;
