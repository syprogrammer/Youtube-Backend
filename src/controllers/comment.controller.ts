import ErrorHandler, { asyncErrorHandler } from "../utils/errorHandler.js";
import { MyUserRequest } from "../types/types.js";
import Comment from "../models/comment.model.js"
import Video from "../models/video.model.js";

export const addComment = asyncErrorHandler(async (req: MyUserRequest, res, next) => {

    const newComment = new Comment({ ...req.body, userId: req.user.id })
    const savedComment = await newComment.save()

    return res.status(200).json({
        success: true,
        message: "comment added successfully",
        comment: savedComment
    })
})

export const deleteComment = asyncErrorHandler(async (req:MyUserRequest, res, next) => {

    const comment = await Comment.findById(req.params.id)
    const video = await Video.findById(req.params.id)
    
    if (!video && !comment) {
        return next(new ErrorHandler("Invalid id", 400))
    }
    if (!(req.user.id === comment?.userId) || !(req.user.id === video?.userId)) {
        return next(new ErrorHandler("Not authorized to comment", 400))
    }

    await Comment.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        success: true,
        message: "comment deleted successfully"
    })
})
export const getComments = asyncErrorHandler(async (req, res, next) => {

    const comments = await Comment.find({videoId:req.params.videoId})

    return res.status(200).json({
        success: true,
        message: "comments fetched successfully",
        comments
    })
})