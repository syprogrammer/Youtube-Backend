import ErrorHandler, { asyncErrorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { MyUserRequest } from "../types/types.js";


export const verifyToken = asyncErrorHandler(async (req: MyUserRequest, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return next(new ErrorHandler("unauthorized request", 401))
        }
        interface UserPayload {
            id: string;
          }
        const decodedToken  = jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET || "mysecretkey")) as UserPayload

        console.log("decoded token=>", decodedToken)
        const user = await User.findById(decodedToken.id).select("-password -refreshToken")

        if (!user) {
            return next(new ErrorHandler("Invalid Token", 403))
        }
        console.log(user)
        req.user = user
        next()

    } catch (error: any) {
        return next(new ErrorHandler(error?.message || "Invalid Token", 401))
    }
})