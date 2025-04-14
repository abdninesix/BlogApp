import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"

export const getComments = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId }).populate("user", "username img").sort({ createdAt: -1 })
    res.json(comments)
}

export const addComments = async (req, res) => {
    const clerkUserId = req.auth.userId
    const postId = req.params.postId
    if (!clerkUserId) { return res.status(401).json("Not authenticated") }

    const user = await User.findOne({ clerkUserId })

    const newComment = new Comment({ ...req.body, user: user._id, post: postId })
    const savedComment = await newComment.save()
    setTimeout(() => {
        res.status(201).json(savedComment)
    }, 3000)
}

export const deleteComments = async (req, res) => {
    const clerkUserId = req.auth.userId
    const postId = req.params.postId
    if (!clerkUserId) { return res.status(401).json("Not authenticated") }

    const role = req.auth.sessionClaims?.metadata?.role || "user"
    if (role === "admin") {
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json("Comment deleted")
    }

    const user = await User.findOne({ clerkUserId })

    const deletedComment = await Comment.findOneAndDelete({ _id: id, user: user._id })

    if (!deletedComment) { res.status(403).jsoon("You cannot delete this comment") }

    res.status(200).json("Comment deleted")
}