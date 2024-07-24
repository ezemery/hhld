import express from "express";
import verifyToken from "../middleware/verifyToken";
import { getUser } from "../controllers/users.controller";

const router = express.Router();

router.get("/", verifyToken, getUser);

export default router;
