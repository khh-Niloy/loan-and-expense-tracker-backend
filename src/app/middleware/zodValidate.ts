import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const zodValidate = (zodSchema: ZodObject) => async(req: Request, res: Response, next: NextFunction) =>{
    try {
        req.body = (await zodSchema.safeParseAsync(req.body)).data
        next()
    } catch (error) {
        console.log("zod validation error\n", error)
    }
}   