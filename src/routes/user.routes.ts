import express from "express"
import { deleteUser, like, dislike, getUser, updateUser, subscribe, unsubscribe }
    from "../controllers/user.controllers.js"
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = express.Router()


// update a user
router.put("/update/:id", verifyToken, updateUser)

// delete a user
router.delete("/delete/:id", verifyToken, deleteUser)

// get a user
router.get("/find/:id", getUser)

// subscribe a user
router.put("/sub/:id", verifyToken, subscribe)

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe)

// like a video
router.put("/like/:videoId", verifyToken, like)

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)




export default router