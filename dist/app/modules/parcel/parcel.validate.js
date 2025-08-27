"use strict";
// src/modules/parcel/parcel.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelParcelZodSchema = exports.updateParcelStatusZodSchema = exports.updateParcelBlockStatusZodSchema = exports.updateParcelValidationSchema = exports.createParcelZodSchema = void 0;
const zod_1 = require("zod");
const parcel_interface_1 = require("./parcel.interface");
exports.createParcelZodSchema = zod_1.z.object({
    receiver: zod_1.z.object({
        name: zod_1.z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Receiver name cannot exceed 50 characters'),
        phone: zod_1.z
            .string()
            .regex(/^01[0-9]{9}$/, 'Invalid Bangladeshi phone number')
            .min(11, 'Phone number must be 11 digits')
            .max(11, 'Phone number must be 11 digits'),
        email: zod_1.z.string()
            .email({ message: "Invalid email address" }),
        address: zod_1.z.string().min(1, 'Receiver address is required').max(200, 'Receiver address cannot exceed 200 characters'),
        userId: zod_1.z.string().optional(),
    }).strict(), // .strict() ensures no extra properties are allowed
    parcelType: zod_1.z.string().min(1, 'Parcel type is required').max(50, 'Parcel type cannot exceed 50 characters'),
    weight: zod_1.z.number().positive('Weight must be a positive number'),
    deliveryAddress: zod_1.z.string().min(1, 'Delivery address is required').max(200, 'Delivery address cannot exceed 200 characters'),
});
//  export const updateParcelValidationSchema = z.object({
//   receiver: z.object({
//     name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Receiver name cannot exceed 50 characters'),
//     phone: z
//       .string()
//       .regex(/^01[0-9]{9}$/, 'Invalid Bangladeshi phone number')
//       .min(11, 'Phone number must be 11 digits')
//       .max(11, 'Phone number must be 11 digits'),
//     email: z
//       .string()
//       .email({ message: "Invalid email address" }),
//     address: z.string().min(1, 'Receiver address is required').max(200, 'Receiver address cannot exceed 200 characters'),
//   }).partial(), // <--- The key change is here
//   parcelType: z.string().min(1, 'Parcel type is required').max(50, 'Parcel type cannot exceed 50 characters').optional(),
//   weight: z.number().positive('Weight must be a positive number').optional(),
//   deliveryAddress: z.string().min(1, 'Delivery address is required').max(200, 'Delivery address cannot exceed 200 characters').optional(),
// }).strict().partial();
exports.updateParcelValidationSchema = zod_1.z.object({
    receiver: zod_1.z.object({
        // ভেতরের প্রতিটি ফিল্ডকে optional() করে দেওয়া হয়েছে
        name: zod_1.z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Receiver name cannot exceed 50 characters').optional(),
        phone: zod_1.z
            .string()
            .regex(/^01[0-9]{9}$/, 'Invalid Bangladeshi phone number')
            .min(11, 'Phone number must be 11 digits')
            .max(11, 'Phone number must be 11 digits')
            .optional(),
        email: zod_1.z
            .string()
            .email({ message: "Invalid email address" })
            .optional(),
        address: zod_1.z.string().min(1, 'Receiver address is required').max(200, 'Receiver address cannot exceed 200 characters').optional(),
    }).partial(), // এখানে .partial() না থাকলেও চলবে, কারণ ভেতরের সব ফিল্ডকে optional করা হয়েছে
    parcelType: zod_1.z.string().min(1, 'Parcel type is required').max(50, 'Parcel type cannot exceed 50 characters').optional(),
    weight: zod_1.z.number().positive('Weight must be a positive number').optional(),
    deliveryAddress: zod_1.z.string().min(1, 'Delivery address is required').max(200, 'Delivery address cannot exceed 200 characters').optional(),
}).strict().partial();
// New Zod schema for blocking a parcel
exports.updateParcelBlockStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        isBlocked: zod_1.z.boolean(),
        note: zod_1.z.string().optional(),
    }),
});
exports.updateParcelStatusZodSchema = zod_1.z.object({
    status: zod_1.z.enum([...Object.values(parcel_interface_1.IParcelStatus)]),
    location: zod_1.z.string().min(1, 'Location cannot be empty').optional(),
    note: zod_1.z.string().min(1, 'Note cannot be empty').optional(),
});
exports.cancelParcelZodSchema = zod_1.z.object({});
