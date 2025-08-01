/* eslint-disable @typescript-eslint/no-unused-vars */

import bcryptjs from "bcrypt";
import { User } from "../user/user.model";
import { IUser } from '../user/user.interface';
import { crateToken } from '../../utils/userToken';
import { envVars } from '../../config/env';
import { any } from "zod";
import { JwtPayload } from "jsonwebtoken";


const loginUserService = async (payload: Partial<IUser>) => {
  const { email, password } = payload

  const isUserAxist = await User.findOne({ email }).select("+password");


  if (!isUserAxist) {
    throw new Error("Email dose not exit")
  }

  const passwordMatch = await bcryptjs.compare(password as string, isUserAxist.password as string)

  if (!passwordMatch) {
    throw new Error("Password dose not exit")
  }

  const userTokens = crateToken(isUserAxist)

  const { password:pass, ...rest } = isUserAxist.toObject()
  return {
    accesToken: userTokens.accesToken,
    user: rest

  }
}




const passwordResetService = async (userId: string, oldPassword: string, newPassword: string) => {

    const user = await User.findOne({ _id: userId }).select("+password");

    if (!user) {
        throw new Error("User not found");
    }
    const OldpasswordMatch = await bcryptjs.compare(oldPassword, user.password as string);

    if (!OldpasswordMatch) {
        throw new Error("Password dose not exit");
    }

    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

    await user.save();
    
    return null;
};



export const AuthService =
{

  loginUserService,  passwordResetService

}