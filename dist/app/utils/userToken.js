"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const crateToken = (user) => {
    const jsonPaylod = {
        userId: user._id,
        userEmail: user.email,
        userRole: user.role
    };
    const accesToken = jsonwebtoken_1.default.sign(jsonPaylod, env_1.envVars.JWT_ACCESS_SECRET, { expiresIn: env_1.envVars.JWT_REFRESH_EXPIRES });
    return {
        accesToken,
    };
};
exports.crateToken = crateToken;
