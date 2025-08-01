"use strict";
// import { NextFunction, Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import AppError from "../errorHelpers/AppError";
// import { verifyToken } from "../utils/jwt";
// import { envVars } from "../config/env";
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
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "No Token Received");
        }
        const token = accessToken.replace('Bearer ', '');
        const verifiedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
        const user = yield user_model_1.User.findById(verifiedToken.userId);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        if (user.status === 'Blocked') { // Use string literal based on your interface
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "User account is blocked");
        }
        if (authRoles.length && !authRoles.includes(user.role)) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not permitted to view this route!!!");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
