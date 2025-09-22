import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service"
import { successResponse } from "../../utils/successResponse";
import { setCookie } from "../../utils/setCookie";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {accessToken, refreshToken, newCreatedUser} = await userServices.createUserService(req.body);

    setCookie(res, accessToken, refreshToken);

    successResponse(res, {
      status: 201,
      success: true,
      message: "user created",
      data: newCreatedUser,
    });
  } catch (err) {
    console.log(err);
    // next(err);
  }
};


export const userController = {
    createUser,
}