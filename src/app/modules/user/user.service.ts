import bcryptjs from "bcrypt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { User } from "./user.model";
import { IAuthProvider, IUser, IUserRole, IUserStatus } from "./user.interface";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = { provider: "Credential", providerId: email as string }


    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    })

    return user

}



const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

  

    if (payload.role) {
        if (decodedToken.role === IUserRole.Receiver || decodedToken.role === IUserRole.Sender) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === IUserRole.Admin && decodedToken.role === IUserRole.Admin) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }



    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
}


const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

const getSingleUser = async (id: string) => {
    return await User.findById(id);
};


const changeUserStatus = async (
  userId: string,
  newStatus: IUserStatus,
): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.status = newStatus;
  await user.save();
  return user;
};





const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id);
};


export const UserServices = {
    createUser,
    getAllUsers,
    updateUser,
    getSingleUser,
    changeUserStatus ,
    deleteUser
}