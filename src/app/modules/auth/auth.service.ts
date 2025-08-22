import bcryptjs from "bcryptjs";
import { isActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createAccessAndRefreshToken, jwtPayloadFunc, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";


const userLoginService = async (playLoad: Partial<IUser>) => {
  const { email, password, phoneNumber } = playLoad;

  const filter = email ? { email } : { phoneNumber };
  
  const user = await User.findOne(filter);

  if (!user) {
    throw new Error("user not found");
  }

  if (user?.isActive === isActive.INACTIVE) {
    throw new Error(`user is ${user?.isActive}!`);
  }

  if (user?.isBlocked) {
    throw new Error(`user is ${user?.isBlocked}!`);
  }

  const checkPassword = await bcryptjs.compare(
    password as string,
    user.password as string
  );

  if (!checkPassword) {
    throw new Error("password does not match!");
  }

  const jwtPayload = jwtPayloadFunc(user._id, email as string, user.phoneNumber as string)

  const {accessToken, refreshToken} = createAccessAndRefreshToken(jwtPayload)
  
  return {accessToken, refreshToken, user};
};

const getNewAccessTokenService = async (rfToken: string) => {

  const userInfoFromRefreshToken = verifyToken(
    rfToken,
    envVars.JWT_REFRESH_SECRET
  );

  if (!userInfoFromRefreshToken) {
    throw new Error("refresh token not found");
  }

  const user = await User.findById(
    (userInfoFromRefreshToken as JwtPayload).userId
  );

  if (!user) {
    throw new Error("user not found");
  }

  const jwtPayload = jwtPayloadFunc(user._id, user.email, user.phoneNumber as string)

  const {accessToken, refreshToken} = createAccessAndRefreshToken(jwtPayload)
  return {accessToken, refreshToken}
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  payload: JwtPayload
) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new Error("user not exist");
  }

  const isPasswordOK = await bcryptjs.compare(
    oldPassword,
    user?.password as string
  );

  if (!isPasswordOK) {
    throw new Error("old password did not match!");
  }

  const newHashedPassword = await bcryptjs.hash(
    newPassword,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  user.password = newHashedPassword;
  user.save();
};

const forgetPasswordService = async (email: string) => {
  const existingUser = await User.findOne({email: email});

  if (!existingUser) {
    throw new Error("user does not exist");
  }

  if (existingUser?.isActive === isActive.INACTIVE) {
    throw new Error(`user is ${existingUser?.isActive}!`);
  }
        
  if(existingUser?.isBlocked) {
    throw new Error("user is blocked!");
  }

  //  * have to add is verified check

  const jwtPayload = jwtPayloadFunc(existingUser._id, existingUser.email, existingUser.phoneNumber as string)

  const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: "10m"
  })

  const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${existingUser._id}&token=${resetToken}`

  sendEmail({
    to: existingUser?.email,
    subject: "Password Reset",
    templateName: "forgetPass",
    templateData: {
      name: existingUser?.name,
      resetUILink
    }
  })
};

const resetPasswordService = async (id: string, password: string, userInfo: JwtPayload) => {

  if(id !== userInfo.userId){
    throw new Error("user id does not match");
  }

  const user = await User.findById(id)

  if(!user){
    throw new Error("user does not match");
  }

  const newUpdatedHashedPassword = await bcryptjs.hash(
    password,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );
  user.password = newUpdatedHashedPassword
  await user.save()
};

export const authService = {
  userLoginService,
  getNewAccessTokenService,
  changePassword,
  forgetPasswordService,
  resetPasswordService
};
