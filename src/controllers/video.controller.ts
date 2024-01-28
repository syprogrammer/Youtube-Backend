import ErrorHandler, { asyncErrorHandler } from "../utils/errorHandler.js";
import Video from "../models/video.model.js";
import { MyUserRequest } from "../types/types.js"
import User from "../models/user.model.js";
export const addVideo = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
   
    const newVideo = new Video({
        userId: req.user.id,
        ...req.body
    })

    await newVideo.save()

    res.status(200).json({
        success: true,
        message: "  successfully",
        video: newVideo
    })
})

export const updateVideo = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    const video = await Video.findById(req.params.id)
    if (!video) {
        return next(new ErrorHandler("No Video found !", 404))
    }
    if (video.userId !== req.user.id) {
        return next(new ErrorHandler("you can only update your video", 403))
    }
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        }, { new: true })
    res.status(200).json({
        success: true,
        message: " updated successfully",
        video: updatedVideo
    })
})

export const increaseView = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }


    const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
        {
            $inc: { views: 1 }
        }, { new: true })

    res.status(200).json({
        success: true,
        message: "view increased successfully",
        video: updatedVideo
    })
})


export const deleteVideo = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    const video = await Video.findById(req.params.id)
    if (!video) {
        return next(new ErrorHandler("No Video found !", 404))
    }
    if (video.userId !== req.user.id) {
        return next(new ErrorHandler("you can only delete your video", 403))
    }
    await Video.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: " Video Deleted successfully"
    })
})
export const getVideo = asyncErrorHandler(async (req, res, next) => {
    if (!req.params.id) {
        return next(new ErrorHandler("Enter valid id", 400))
    }
    const video = await Video.findById(req.params.id)

    if (!video) {
        return next(new ErrorHandler("No Video found !", 404))
    }
    res.status(200).json({
        success: true,
        message: "Video Fetched successfully",
        video
    })
})
export const getTrendingVideos = asyncErrorHandler(async (req, res, next) => {
    const videos = await Video.find().sort({ views: -1 })
    res.status(200).json({
        success: true,
        message: " Trending Videos successfully",
        videos
    })
})
export const getRandomVideos = asyncErrorHandler(async (req, res, next) => {
    const videos = await Video.aggregate([{ $sample: { size: 12 } }])
    res.status(200).json({
        success: true,
        message: " Videos fetched successfully",
        videos
    })
})
export const getSubscribedVideos = asyncErrorHandler(async (req: MyUserRequest, res, next) => {


    const user = await User.findById(req.user.id)
    console.log(user)

    if (!user) {
        return next(new ErrorHandler("No user found", 404))
    }
    const subscribedChannels = user.subscribedUsers

    const list = await Promise.all(
        subscribedChannels.map((channelId) => {
            return Video.find({ userId: channelId })
        })
    )

    console.log(" video list => ", list)

    res.status(200).json({
        success: true,
        message: "Videos fetched successfully",
        videos: list.flat()
    })
})


export const getByTag = asyncErrorHandler(async (req: MyUserRequest, res, next) => {

    if (!req.query.tags) {
        return next(new ErrorHandler("No query tags found", 404))
    }
    const tags = req.query.tags.split(",")
    console.log(tags)
    const videos = await Video.find({ tags: { $in: tags } }).limit(20)

    res.status(200).json({
        success: true,
        message: "Videos fetched successfully",
        videos
    })
})
export const search = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    const query = req.query.q
    if (query) {
        return next(new ErrorHandler("No query  found", 404))
    }

    const videos = await Video.find({
        title: { $regex: query, $options: "i" },
    }).limit(12)

    res.status(200).json({
        success: true,
        message: "Videos fetched successfully",
        videos
    })
})