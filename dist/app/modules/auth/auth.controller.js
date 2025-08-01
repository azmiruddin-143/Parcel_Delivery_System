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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const credentialsLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield auth_service_1.AuthService.loginUserService(req.body);
        res.cookie("accessToken", loginUser.accesToken, {
            httpOnly: true,
            secure: false
        });
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
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User Logged out Successfully",
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            throw new Error("Unauthorized: User not authenticated");
        }
        const userresetPassword = yield auth_service_1.AuthService.passwordResetService(userId, oldPassword, newPassword);
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
exports.AuthController = { credentialsLogin, userLogout, resetPassword };
