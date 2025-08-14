import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  jwtPayload: JwtPayload,
  jwtSecret: string,
  jwtExpiresIn: string
) => {
  const accessToken = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  } as SignOptions);

  const refreshToken = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  } as SignOptions);

  return {accessToken, refreshToken};
};

export const verifyToken = (accessToken: string, jwtSecret: string) => {
    return jwt.verify(accessToken, jwtSecret);
};