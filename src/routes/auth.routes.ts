import express from "express"
import { googleSignin, signin, signup } from "../controllers/auth.controllers.js"

const router = express.Router()

//create a user
router.post("/signup",signup)
//signin
router.post("/signin",signin)

//google auth
router.post("/googlesignin",googleSignin)

export default router