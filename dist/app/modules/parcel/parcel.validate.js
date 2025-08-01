"use strict";
// src/modules/parcel/parcel.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelParcelZodSchema = exports.updateParcelStatusZodSchema = exports.createParcelZodSchema = void 0;
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
        address: zod_1.z.string().min(1, 'Receiver address is required').max(200, 'Receiver address cannot exceed 200 characters'),
        userId: zod_1.z.string().optional(),
    }).strict(), // .strict() ensures no extra properties are allowed
    parcelType: zod_1.z.string().min(1, 'Parcel type is required').max(50, 'Parcel type cannot exceed 50 characters'),
    weight: zod_1.z.number().positive('Weight must be a positive number'),
    deliveryAddress: zod_1.z.string().min(1, 'Delivery address is required').max(200, 'Delivery address cannot exceed 200 characters'),
});
exports.updateParcelStatusZodSchema = zod_1.z.object({
    status: zod_1.z.enum([...Object.values(parcel_interface_1.IParcelStatus)]),
    location: zod_1.z.string().min(1, 'Location cannot be empty').optional(),
    note: zod_1.z.string().min(1, 'Note cannot be empty').optional(),
});
exports.cancelParcelZodSchema = zod_1.z.object({});
