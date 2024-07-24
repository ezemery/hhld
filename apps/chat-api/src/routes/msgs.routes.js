import express from "express";
import getMsgsForConversation from "../controllers/msgs.controllers";

const router = express.Router();

router.get("/", getMsgsForConversation);

export default router;
