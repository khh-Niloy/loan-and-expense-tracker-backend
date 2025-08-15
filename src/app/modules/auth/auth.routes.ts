import { Router } from "express";
import { authController } from "./auth.controller";
import { zodValidate } from "../../middleware/zodValidate";
import { authLoginSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/login", zodValidate(authLoginSchema), authController.userLogin);

authRoutes.post("/refresh-token", authController.getNewAccessToken);

authRoutes.post("/logout", authController.userLogOut);