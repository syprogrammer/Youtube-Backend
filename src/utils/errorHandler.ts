import { ControllerType } from "../types/types.js"
import { NextFunction, Request, Response } from "express";

class ErrorHandler extends Error{
    constructor(public message:string,public statusCode:number){
        super(message)
        this.statusCode = statusCode
    }
}



export function asyncErrorHandler (func:ControllerType){
    return function(req:Request,res:Response,next:NextFunction){
        return Promise.resolve(func(req,res,next)).catch(next)
    }
}


export default ErrorHandler