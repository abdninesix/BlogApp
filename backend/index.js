import express from 'express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import webhookRouter from './routes/webhook.route.js'
import connectDB from './lib/connectDB.js'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from 'cors'

const app = express()

app.use(cors(process.env.CLIENT_URL))

app.use(clerkMiddleware())

app.use("/webhooks", webhookRouter) //we wrote this before express.json because webhooks is already using body-parser which will cause conflict 

app.use(express.json()) //we use this to create a post and convert it into a json document for mongodb

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

/*app.get("/auth-state", (req,res)=>{
    const authState = req.auth;
    res.json(authState);
})*/

/*app.get("/protect", requireAuth(), (req,res)=>{ //Method 1 imported from Clerk
    res.status(200).json("content")
})*/

/*app.get("/protect", (req,res)=>{ //Method 2 custom code
    const {userId} = req.auth;
    if (!userId) {
        return res.status(401).json("not authenticated")
    }
    res.status(200).json("content")
})*/

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({message:error.message || "Something went wrong", status: error.status, stack: error.stack})
})

app.listen(3000, ()=>{
    connectDB();
    console.log("Server is running")
})