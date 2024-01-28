import express from 'express'
const app = express()
import cors from "cors"
import morgan from 'morgan'
import cookieParser from "cookie-parser"

import { errorMiddleware } from './middlewares/error.middleware.js'

//routes import 
import userRoutes from "./routes/user.routes.js"
import videoRoutes from "./routes/video.routes.js"
import commentRoutes from "./routes/comment.routes.js"
import authRoutes from "./routes/auth.routes.js"

//Handle cors 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//Required Middlewares
app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))
//Routes
app.get("/",(req,res)=>{
    res.send("Server is working properly")
})

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/video",videoRoutes)
app.use("/api/v1/comment",commentRoutes)
app.use("/api/v1/auth",authRoutes)


//Error middleware to be used below route 
//to cache err from routes

app.use(errorMiddleware)
export default app