/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import { AuthService } from "./auth.service"
import httpStatus from "http-status-codes";
const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginUser = await AuthService.loginUserService(req.body)

        res.cookie("accessToken", loginUser.accesToken, {
            httpOnly: true,
            secure: false
        })


        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User Login SuccesFull",
            data: loginUser
        })

    }
    catch (error) {
        next(error)
    }
}

const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false, 
            sameSite: "lax"
        });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, 
            message: "User Logged out Successfully",
            data: null
        });
    } catch (error) {
        next(error);
    }
};



const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body;
        
        const userId = req.user?._id; 

        if (!userId) {
            throw new Error("Unauthorized: User not authenticated");
        }

        const userresetPassword = await AuthService.passwordResetService(
            userId, 
            oldPassword,
            newPassword
        );

        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Reset Password SuccesFull",
            data: userresetPassword
        });
    } catch (error) {
        next(error);
    }
};






export const AuthController = { credentialsLogin,  userLogout, resetPassword}

