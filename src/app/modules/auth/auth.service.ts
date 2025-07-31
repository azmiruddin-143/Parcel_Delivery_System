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

//   console.log("email Or Password from payload:", email,password);


  const isUserAxist = await User.findOne({ email }).select("+password");
//   console.log("Password from DB:", isUserAxist.password as string);

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



// const getNewAccessToken = async (refreshToken: string) => {

//   const verifyRefreshToken = verify(refreshToken, envBars.JWT_REFRESH_SECRET) as JwtPayload

//   if (!verifyRefreshToken || !verifyRefreshToken.userEmail) {
//     throw new Error("Tumar Token Verify Kora Nai")
//   }

//   const isUserAxist = await User.findOne({ email: verifyRefreshToken.userEmail })


//   if (!isUserAxist) {
//     throw new Error("Email dose not exit")
//   }

//   if (isUserAxist.isActive == IsActive.Blocked) {
//     throw new Error("Tumar Acount Already Blocked")
//   }
//   if (isUserAxist.isActive == IsActive.InActive) {
//     throw new Error("Tumar Acount Already InActive")
//   }
//   if (isUserAxist.isDeleted) {
//     throw new Error("Tumar Acount Already Deleted")
//   }


//   const jsonPaylod = {
//     userId: isUserAxist._id,
//     userEmail: isUserAxist.email,
//     userRole: isUserAxist.role
//   }

//   const accesToken = jwt.sign(jsonPaylod, envBars.JWT_ACCESS_SECRET, { expiresIn: envBars.JWT_ACCESS_EXPIRES } as SignOptions
//   );

//   return {
//     accesToken: accesToken
//   }
// }


const passwordResetService = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload ) => {

 
  const user = await User.findOne({_id:decodedToken.userId}).select("+password");

  if (!user) {
    throw new Error("User not found");
  }
  const OldpasswordMatch = await bcryptjs.compare(oldPassword, user?.password as string)

  if (!OldpasswordMatch) {
    throw new Error("Password dose not exit")
  }

  user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

  await user?.save()

}





export const AuthService =
{

  loginUserService,  passwordResetService

}