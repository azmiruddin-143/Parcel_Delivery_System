// src/modules/user/user.validation.ts

import z from "zod";
import { IUserRole, IUserStatus } from "./user.interface"; 

export const createZodSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (e.g., @$!%*#?&)" })
        .optional(),
    phone: z.string()
        .regex(/^(01|\+?8801)[0-9]{9}$/, {
            message: "Invalid Bangladeshi phone number. Must be 11 digits and start with 01 or +8801."
        })
        .optional(),
    address: z.string()
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: z.enum([IUserRole.Sender, IUserRole.Receiver]).optional(),
  })


export const updateZodSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .optional(),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (e.g., @$!%*#?&)" })
        .optional(),
    address: z.string()
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: z.enum([IUserRole.Admin, IUserRole.Sender, IUserRole.Receiver]).optional(),
    status: z.enum([IUserStatus.Active,IUserStatus.Blocked]).optional(),

});