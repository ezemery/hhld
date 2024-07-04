import express from "express";
import verifyToken from "../middleware/verifyToken";
import getUsers from "../controllers/users.controller";

const router = express.Router();

router.get("/", verifyToken, getUsers);

export default router;
