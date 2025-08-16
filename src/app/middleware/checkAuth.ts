import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { isActive } from "../modules/user/user.interface";

export const checkAuth = ()=> async (req: Request, res: Response, next: NextFunction)=>{
    const accessToken = req.cookies.accessToken

    if(!accessToken){
        throw new Error("access token not found");
    }

    const userInfoJWTAccessToken = verifyToken(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const user = await User.findOne({ email: userInfoJWTAccessToken.email });

    if (!user) {
      throw new Error("user not found!");
    }

    if(req.path === "/create-loan" && user.credits == 0){
        throw new Error("please buy some credits, credits is now 0");
    }

    if (user?.isActive === isActive.INACTIVE) {
      throw new Error(`user is ${user?.isActive}!`);
    }

    if (user?.isBlocked) {
        throw new Error(`user is ${user?.isBlocked}!`);
    }

    req.user = userInfoJWTAccessToken;

    next()
}