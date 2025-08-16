import { envVars } from "../../config/env";
import { createAccessAndRefreshToken, jwtPayloadFunc } from "../../utils/jwt";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

const createUserService = async (playLoad: Partial<IUser>) => {
  const { email, password, ...rest } = playLoad;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  const newCreatedUser = await User.create({
    email,
    password: hashedPassword,
    ...rest,
  });

  const jwtPayload = jwtPayloadFunc(newCreatedUser._id, email as string, playLoad.phoneNumber as string)

  const {accessToken, refreshToken} = createAccessAndRefreshToken(jwtPayload)

  return {accessToken, refreshToken, newCreatedUser};
};

export const userServices = {
    createUserService,
}