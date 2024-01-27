import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";


export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.message ||= "Some err occured"
    err.statusCode ||= 500
    if (err.name === "CastError") {
        err.message = "Invalid Id"
    }
    return res.status(err.statusCode).json(
        {
            success: false,
            message: err.message
        }
    )
}