import express from 'express'
const app = express()
import cors from "cors"
import morgan from 'morgan'
import { errorMiddleware } from './middlewares/error.middleware.js'

//Handle cors 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//Required Middlewares
app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())
app.use(morgan("dev"))
//Routes
app.get("/",(req,res)=>{
    res.send("Server is working properly")
})

// app.use("/api/v1/user",userRoute)


//Error middleware to be used below route 
//to cache err from routes

app.use(errorMiddleware)
export default app