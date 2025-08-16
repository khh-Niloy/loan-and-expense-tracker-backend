import { Router } from "express";
import { authController } from "./auth.controller";
import { zodValidate } from "../../middleware/zodValidate";
import { authLoginSchema } from "./auth.validation";
import { checkAuth } from "../../middleware/checkAuth";

export const authRoutes = Router();

authRoutes.post("/login", zodValidate(authLoginSchema), authController.userLogin);

authRoutes.post("/refresh-token", authController.getNewAccessToken);

authRoutes.post("/logout", authController.userLogOut);

authRoutes.post("/change-password", checkAuth(), authController.changePassword);

authRoutes.post("/forget-password", authController.forgetPassword)

authRoutes.post("/reset-password", checkAuth(), authController.resetPassword)
