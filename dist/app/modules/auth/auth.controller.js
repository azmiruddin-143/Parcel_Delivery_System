"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const credentialsLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield auth_service_1.AuthService.loginUserService(req.body);
        res.cookie("accessToken", loginUser.accesToken, {
            httpOnly: true,
            secure: false
        });
        // res.cookie("refreshToken", loginUser.refreshToken, {
        //     httpOnly: true,
        //     secure: false
        // })
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: "User Login SuccesFull",
            data: loginUser
        });
    }
    catch (error) {
        next(error);
    }
});
// const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // const loginInfo = await AuthServices.credentialsLogin(req.body)
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     passport.authenticate("local", async (err: any, user: any, info: any) => {
//         if (err) {
//             // ❌❌❌❌❌
//             // throw new AppError(401, "Some error")
//             // next(err)
//             // return new AppError(401, err)
//             // ✅✅✅✅
//             // return next(err)
//             // console.log("from err");
//             return next(new AppError(401, err))
//         }
//         if (!user) {
//             // console.log("from !user");
//             // return new AppError(401, info.message)
//             return next(new AppError(401, info.message))
//         }
//         const tokenInfo = crateToken(user)
//         // delete user.toObject().password
//         const { password: pass, ...rest } = user.toObject()
//     res.cookie("accessToken",tokenInfo.accesToken, {
//         httpOnly: true,
//         secure: false
//     })
//     res.cookie("refreshToken", tokenInfo.refreshToken, {
//         httpOnly: true,
//         secure: false
//     })
//         sendResponse(res, {
//             success: true,
//              statusCode: httpStatus.OK,
//             message: "User Logged In Successfully",
//             data: {
//                 accessToken:tokenInfo.accesToken ,
//                 refreshToken: tokenInfo.refreshToken,
//                 user: rest
//             },
//         })
//     })(req, res, next)
// })
// const createNewToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const refreshToken = req.cookies.refreshToken
//         if (!refreshToken) {
//             throw new Error("Tumi Refresh Token paw nai")
//         }
//         const NewToken = await AuthService.getNewAccessToken(refreshToken as string)
//         res.cookie("accessToken", NewToken.accesToken, {
//             httpOnly: true,
//             secure: false
//         })
//         sendResponse(res, {
//             success: true,
//             statusCode: 201,
//             message: "New Token SuccesFull",
//             data: NewToken
//         })
//     }
//     catch (error) {
//         next(error)
//     }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    // res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax"
    // })
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User Logout SuccesFull",
        data: null
    });
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword } = req.body;
        const decodedToken = req.user;
        if (!decodedToken) {
            throw new Error("Unauthorized: User not authenticated");
        }
        const userresetPassword = yield auth_service_1.AuthService.passwordResetService(oldPassword, newPassword, decodedToken);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 201,
            message: "Reset Password SuccesFull",
            data: userresetPassword
        });
    }
    catch (error) {
        next(error);
    }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     let redirectTo = req.query.state ? req.query.state as string : ""
//     if (redirectTo.startsWith("/")) {
//         redirectTo = redirectTo.slice(1)
//     }
//     const user = req.user;
//     if (!user) {
//         throw new Error("User Not Found")
//     }
//     const tokenInfo = crateToken(user)
//     // setAuthCookie(res, tokenInfo)
//     res.cookie("accessToken",tokenInfo.accesToken, {
//         httpOnly: true,
//         secure: false
//     })
//     res.cookie("refreshToken", tokenInfo.refreshToken, {
//         httpOnly: true,
//         secure: false
//     })
//     // sendResponse(res, {
//     //     success: true,
//     //     statusCode: httpStatus.OK,
//     //     message: "Password Changed Successfully",
//     //     data: null,
//     // })
//     res.redirect(`${envBars.FRONTEND_URL}/${redirectTo}`)
// })
exports.AuthController = { credentialsLogin, userLogout, resetPassword };
