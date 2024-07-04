import express from "express";
import signup, { login } from "../controllers/auth.controller";

const router = express.Router();

// Sign up
router.post("/signup", signup);
// login
router.post("/login", login);

export default router;
