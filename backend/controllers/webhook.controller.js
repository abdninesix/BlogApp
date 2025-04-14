import { Webhook } from 'svix';
import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'

export const ClerkWebHook = async (req, res) => {

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Webhook secret needed")
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (error) {
        return res.status(400).json({
            message: "Webhook verification failed"
        });
    }

    console.log(evt.data)

    if (evt.type === 'user.created') {
        try {
            const newUser = new User({
                clerkUserId: evt.data.id,
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.image_url,
            });
            await newUser.save();
            return res.status(200).json({ message: "User created successfully" })
        } catch (error) {
            console.error("Error saving new user:", error);
            return res.status(500).json({ message: "Failed to save new user" });
        }
    }

    if ( evt.type === 'user.updated') {
        try {
            const updatedUser = await User.findOneAndUpdate({clerkUserId: evt.data.id}, {   
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.image_url,
            }, {new: true})
            if (!updatedUser) {return res.status(404).json({ message: "User not found" })}
            return res.status(200).json({ message: "User updated successfully", user: updatedUser })
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Failed to update user" })
        }
    }

    if (evt.type === "user.deleted") {
        const deletedUser = await User.findOneAndDelete({
            clerkUserId: evt.data.id,
        });

        await Post.deleteMany({ user: deletedUser._id })
        await Comment.deleteMany({ user: deletedUser._id })
    }

    return res.status(200).json({
        message: "Webhook received",
    })
}