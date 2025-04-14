import express from "express"
import { ClerkWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/clerk", bodyParser.raw({ type: 'application/json' }), ClerkWebHook)

export default router