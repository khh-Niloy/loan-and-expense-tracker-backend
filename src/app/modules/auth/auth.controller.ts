import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "./auth.service";
import { setCookie } from "../../utils/setCookie";
import { successResponse } from "../../utils/successResponse";

const userLogin = async (req: Request, res: Response) => {
  try {
    const {accessToken, refreshToken, user} = await authService.userLoginService(req.body);

    setCookie(res, accessToken, refreshToken);

    successResponse(res, {
      status: 200,
      success: true,
      message: "log in successful",
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const rfToken = req.cookies.refreshToken;
    const {accessToken, refreshToken} = await authService.getNewAccessTokenService(
      rfToken as string
    );
    setCookie(res, accessToken, refreshToken);

    successResponse(res, {
      status: 201,
      success: true,
      message: "new accees token created",
      data: {accessToken, refreshToken},
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const userLogOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    successResponse(res, {
      status: 200,
      success: true,
      message: "user log out",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// const changePassword = async (req: Request, res: Response) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const payload = req.user;

//     await authService.changePassword(
//       oldPassword,
//       newPassword,
//       payload as JwtPayload
//     );

//     successResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "password updated",
//       data: null,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: (error as Error).message,
//     });
//   }
// };

export const authController = {
  userLogin,
  getNewAccessToken,
  userLogOut,
//   changePassword
};
