import ImageKit from "imagekit"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3

    const query = {}
    const cat = req.query.cat
    const author = req.query.author
    const searchQuery = req.query.search
    const sortQuery = req.query.sort
    const featured = req.query.featured

    if (cat) { query.category = cat }
    if (author) {
        const user = User.findOne({ username: author }).select("_id")
        if (!user) { return res.status(404).json("No posts found") }
        query.user = user._id
    }
    if (searchQuery) {
        query.$or = [
            { content: { $regex: searchQuery, $options: "i" } },
            { desc: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
            { title: { $regex: searchQuery, $options: "i" } }
        ];
    }
    let sortObj = { createdAt: -1 }
    if (sortQuery) {
        switch (sortQuery) {
            case newest:
                sortObj = { createdAt: -1 }
                break;
            case oldest:
                sortObj = { createdAt: 1 }
                break;
            case popular:
                sortObj = { visit: -1 }
                break;
            case trending:
                sortObj = { visit: -1 }
                query.createdAt = { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) }
                break;

            default:
                break;
        }
    }

    if (featured) {
        query.isFeatured = true;
    }

    const posts = await Post.find(query).populate("user", "username").sort(sortObj).limit(limit).skip((page - 1) * limit);
    const totalPosts = await Post.countDocuments()
    const hasMore = page * limit < totalPosts
    res.status(200).json({ posts, hasMore })
}

export const getPost = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate("user", "username img")
    res.status(200).json(post)
}

export const createPost = async (req, res) => {

    const clerkUserId = req.auth.userId
    if (!clerkUserId) {
        return res.status(401).json("Not authorized")
    }
    const user = await User.findOne({ clerkUserId })
    if (!user) {
        return res.status(401).json("User not found")
    }

    let slug = req.body.title.replace(/ /g, "-").toLowerCase()
    let existingPost = await Post.findOne({ slug })
    let counter = 2

    while (existingPost) {
        slug = `${slug}-${counter}`
        existingPost = await Post.findOne({ slug })
        counter++
    }

    const newPost = new Post({ user: user._id, slug, ...req.body })
    const post = await newPost.save()
    res.status(200).json(post)
}

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId
    if (!clerkUserId) {
        return res.status(401).json("Not authorized")
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user"
    if (role === "admin") {
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json("Post deleted")
    }

    const user = await User.findOne({ clerkUserId })
    if (!user) {
        return res.status(401).json("User not found")
    }

    const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id, user: user._id })
    if (!deletedPost) {
        res.status(403).json("You can only delete your posts")
    }
    res.status(200).json("Post deleted")
}

export const featurePost = async (req, res) => {
    const postId = req.body.postId

    const clerkUserId = req.auth.userId
    if (!clerkUserId) {
        return res.status(401).json("Not authorized")
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user"
    if (role !== "admin") {
        return res.status(403).json("Only admin can feature a post")
    }

    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json("Post not found")
    }

    const isFeatured = post.isFeatured

    const updatedPost = await Post.findByIdAndUpdate(postId, { isFeatured: !isFeatured }, { new: true })

    res.status(200).json(updatedPost, "Post updated")
}

const imageKit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
})

// export const shareAction = async (formData, settings) => {
//     const file = formData.get("file");
  
//     if (!file || typeof file.arrayBuffer !== "function") {
//       throw new Error("Invalid or missing file.");
//     }
  
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
  
//     const transformation =
//       "w-600, " +
//       (settings.type === "square"
//         ? "ar-1-1"
//         : settings.type === "wide"
//         ? "ar-16-9"
//         : "");
  
//     imageKit.upload(
//       {
//         file: buffer,
//         fileName: file.name,
//         folder: "bw/posts",
//         ...(file.type.includes("image") && {
//           transformation: {
//             pre: transformation,
//           },
//         }),
//         customMetadata: {
//           sensitive: settings.sensitive,
//         },
//       },
//       function (error, result) {
//         if (error) {
//           console.log("Upload error:", error);
//         } else {
//           console.log("Upload success:", result);
//         }
//       }
//     );
//   };
  

export const uploadAuth = async (req, res) => {
    const result = imageKit.getAuthenticationParameters()
    res.send(result)
}