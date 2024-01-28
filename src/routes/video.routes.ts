import express from "express"
import { verifyToken } from "../middlewares/auth.middleware.js"
import {
    addVideo,
    updateVideo,
    deleteVideo,
    increaseView,
    getVideo,
    getTrendingVideos,
    getRandomVideos,
    getSubscribedVideos,
    getByTag,
    search

} from "../controllers/video.controller.js"

const router = express.Router()


// create a video 
router.post("/", verifyToken, addVideo)

// update a video 
router.put("/", verifyToken, updateVideo)

// delete a video
router.delete("/:id", verifyToken, deleteVideo)

//increase views
router.put("/view/:id", increaseView)

// get a video details
router.get("/find/:id", getVideo)

//get trending video
router.get("/trend", getTrendingVideos)

//get a random video 
router.get("/random", getRandomVideos)

router.get("/sub", verifyToken,getSubscribedVideos)
router.get("/tags", getByTag)
router.get("/search", search)

export default router