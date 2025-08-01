"use strict";
// src/modules/user/user.validation.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateZodSchema = exports.createZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: zod_1.default.string()
        .email({ message: "Invalid email address" }),
    password: zod_1.default.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (e.g., @$!%*#?&)" })
        .optional(),
    phone: zod_1.default.string()
        .regex(/^(01|\+?8801)[0-9]{9}$/, {
        message: "Invalid Bangladeshi phone number. Must be 11 digits and start with 01 or +8801."
    })
        .optional(),
    address: zod_1.default.string()
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: zod_1.default.enum([user_interface_1.IUserRole.Sender, user_interface_1.IUserRole.Receiver]).optional(),
});
exports.updateZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .optional(),
    password: zod_1.default.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (e.g., @$!%*#?&)" })
        .optional(),
    address: zod_1.default.string()
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: zod_1.default.enum([user_interface_1.IUserRole.Admin, user_interface_1.IUserRole.Sender, user_interface_1.IUserRole.Receiver]).optional(),
    status: zod_1.default.enum([user_interface_1.IUserStatus.Active, user_interface_1.IUserStatus.Blocked]).optional(),
});
