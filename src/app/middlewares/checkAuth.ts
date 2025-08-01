// import { NextFunction, Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import AppError from "../errorHelpers/AppError";
// import { verifyToken } from "../utils/jwt";
// import { envVars } from "../config/env";

// export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

//     try {
//         const accessToken = req.headers.authorization;

//         if (!accessToken) {
//             throw new AppError(403, "No Token Recieved")
//         }


//         const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
//         if (!authRoles.includes(verifiedToken.userRole)) {
//             throw new AppError(403, "You are not permitted to view this route!!!")
//         }
//         req.user = verifiedToken
       
//        next();
//     } catch (error) {
//         next(error)
//     }
// }




import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt"; 
import { envVars } from "../config/env"; 
import { User } from "../modules/user/user.model";
import {  IUserRole } from "../modules/user/user.interface"; 

export const checkAuth = (...authRoles: IUserRole[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(httpStatus.FORBIDDEN, "No Token Received");
        }

        const token = accessToken.replace('Bearer ', '');

        const verifiedToken = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        const user = await User.findById(verifiedToken.userId);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }
        
        if (user.status === 'Blocked') { // Use string literal based on your interface
            throw new AppError(httpStatus.FORBIDDEN, "User account is blocked");
        }

        if (authRoles.length && !authRoles.includes(user.role as IUserRole)) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not permitted to view this route!!!");
        }
        
        req.user = user;
        
        next();
    } catch (error) {
        next(error);
    }
};



