import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";

export const checkAuthAndCredits = ()=> async (req: Request, res: Response, next: NextFunction)=>{
    const accessToken = req.cookies.accessToken

    if(!accessToken){
        throw new Error("access token not found");
    }

    

    next()
}