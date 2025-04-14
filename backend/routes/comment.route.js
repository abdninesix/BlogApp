import express from "express"
import { addComments, deleteComments, getComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getComments)
router.post("/:postId", addComments)
router.delete("/:id", deleteComments)

export default router