"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const userToken_1 = require("../../utils/userToken");
const env_1 = require("../../config/env");
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //   console.log("email Or Password from payload:", email,password);
    const isUserAxist = yield user_model_1.User.findOne({ email }).select("+password");
    //   console.log("Password from DB:", isUserAxist.password as string);
    if (!isUserAxist) {
        throw new Error("Email dose not exit");
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, isUserAxist.password);
    if (!passwordMatch) {
        throw new Error("Password dose not exit");
    }
    const userTokens = (0, userToken_1.crateToken)(isUserAxist);
    const _a = isUserAxist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accesToken: userTokens.accesToken,
        user: rest
    };
});
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
const passwordResetService = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: decodedToken.userId }).select("+password");
    if (!user) {
        throw new Error("User not found");
    }
    const OldpasswordMatch = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!OldpasswordMatch) {
        throw new Error("Password dose not exit");
    }
    user.password = yield bcrypt_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    yield (user === null || user === void 0 ? void 0 : user.save());
});
exports.AuthService = {
    loginUserService, passwordResetService
};
