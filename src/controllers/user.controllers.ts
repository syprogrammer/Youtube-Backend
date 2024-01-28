import { MyUserRequest } from "../types/types.js";
import ErrorHandler, { asyncErrorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const updateUser = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    if (req.params.id !== req.user.id) {
        return next(new ErrorHandler("you can't update another account", 403))
    }


    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true }).select("-password")

    return res.status(200).json({
        success: true,
        message: "user updated successfully",
        updatedUser
    })
})

//delete a user controller 
export const deleteUser = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    if (req.params.id !== req.user.id) {
        return next(new ErrorHandler("you can't delete another account", 403))
    }

    await User.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        success: true,
        message: "Your Accont Deleted successfully",

    })
})
//get a user controller
export const getUser = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    const user = await User.findById(req.params.id).select("-password")
    return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        user
    })
})
//subscribe a user controller
export const subscribe = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }

    await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id }
    })

    await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 }
    })

    return res.status(200).json({
        success: true,
        message: "subscribed successfully"
    })
})

//unsubscribe a user 
export const unsubscribe = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }

    await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id }
    })

    await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 }
    })
    return res.status(200).json({
        success: true,
        message: "unsubscribed successfully"
    })
})

// like a video 
export const like = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    return res.status(200).json({
        success: true,
        message: "user logged in successfully"
    })
})

//dislike a video
export const dislike = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    return res.status(200).json({
        success: true,
        message: "user logged in successfully"
    })
})