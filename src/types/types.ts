import { NextFunction, Request, Response } from "express";

export type ControllerType = (
    req:Request,
    res:Response,
    next:NextFunction

)=>Promise< void | Response<any,Record<string,any>>>

interface DocumentResult<T> {
    _doc: T;
}
export interface UserRequestBody extends DocumentResult<UserRequestBody>{
    name:string
    email:string,
    password:string,
    img:string,
    subscribers:string;
    subscribedUsers:[string]
    _id:string
}

export type userResult = UserRequestBody | null


export interface MyUserRequest extends Request {
  // Use `user?:` here instead of `user:`.
  user?: any;
}