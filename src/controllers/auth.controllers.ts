import User from "../models/user.model.js";
import { UserRequestBody, userResult } from "../types/types.js";
import ErrorHandler, { asyncErrorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//signup controller
export const signup = asyncErrorHandler(async (req, res, next) => {
    // const {name,email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        ...req.body, password: hash
    })
    await newUser.save()

    return res.status(200).json({
        success: true,
        message: "user signedup successfully",
        user: newUser._id,
    })
})

//signin controller
export const signin = asyncErrorHandler(async (req, res, next) => {

    const user:userResult = await User.findOne({ name: req.body.name })
    
    if (!user) return next(new ErrorHandler("Invalid user", 404))

    const isCorrect = await bcrypt.compare(req.body.password, user.password)

    if (!isCorrect) return next(new ErrorHandler("Invalid Credentials", 400))
    const token = jwt.sign({ id: user._id }, (process.env.ACCESS_TOKEN_SECRET || "mysecretkey"))

    const {password,...userDetails} = user._doc

    return res.cookie("access-token", token, {
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "user logged in successfully",
        userDetails
    })
})

// google signin controller
export const googleSignin = asyncErrorHandler(async (req, res, next) => {
    // const {name,email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        ...req.body, password: hash
    })
    await newUser.save()

    return res.status(200).json({
        success: true,
        message: "user signedup successfully",
        user: newUser,
    })
})