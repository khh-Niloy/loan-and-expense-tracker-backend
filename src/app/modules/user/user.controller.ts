import { Request, Response } from "express"
import { userServices } from "./user.service"


const createUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.createUserService(req.body);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "User creation failed"
            });
        }

        res.cookie("accessToken", result.token, {
  httpOnly: false,
  secure: false,
  sameSite: 'lax', // or 'none' + HTTPS for cross-domain
});


        res.status(201).json({
            message: "user created",
            data: result
        });
    } catch (error) {
        res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
    }
}

export const userController = {
    createUser,
}