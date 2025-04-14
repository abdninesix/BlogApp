import express from "express"
import { deletePost, createPost, getPost, getPosts, uploadAuth, featurePost } from "../controllers/post.controller.js";
import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth)

router.get("/", getPosts)
router.get("/:slug",increaseVisit, getPost)
router.post("/", createPost)
router.delete("/:id", deletePost)
router.patch("/feature", featurePost)

export default router