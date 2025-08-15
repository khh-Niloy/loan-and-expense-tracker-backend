import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";

export const createAccessAndRefreshToken = (
  jwtPayload: JwtPayload,
) => {
  const accessToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: envVars.JWT_ACCESS_EXPIRES,
  } as SignOptions);

  const refreshToken = jwt.sign(jwtPayload, envVars.JWT_REFRESH_SECRET, {
    expiresIn: envVars.JWT_REFRESH_EXPIRES,
  } as SignOptions);

  return {accessToken, refreshToken};
};

export const verifyToken = (token: string, jwtSecret: string) => {
    return jwt.verify(token, jwtSecret);
};