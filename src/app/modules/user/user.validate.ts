// // src/modules/user/user.validation.ts
// import { z } from 'zod';
// import { IUserRole, IUserStatus } from './user.interface';


// export const createUserZodSchema = z.object({
//   body: z.object({
//     name: z.string({
//       required_error: 'Name is required',
//     }).trim().min(1, 'Name cannot be empty'),
//     email: z.string({
//       required_error: 'Email is required',
//     }).email('Invalid email address').trim(),
//     password: z.string({
//       required_error: 'Password is required',
//     }).min(6, 'Password must be at least 6 characters long'),
//     role: z.enum(['sender', 'receiver', 'admin'], {
//       required_error: 'Role is required',
//       invalid_type_error: "Role must be 'sender', 'receiver', or 'admin'",
//     }).default('sender'), // Default role for registration
//     phone: z.string().trim().optional(),
//     address: z.string().trim().optional(),
//   }),
// });


// export const updateUserZodSchema = z.object({
//   body: z.object({
//     name: z.string().trim().min(1, 'Name cannot be empty').optional(),
//     email: z.string().email('Invalid email address').trim().optional(),
//     phone: z.string().trim().optional(),
//     address: z.string().trim().optional(),
//     status: z.enum( Object.values(IUserStatus), {
//       invalid_type_error: "Status must be 'active' or 'blocked'",
//     }).optional(),
//     role: z.enum( Object.values(IUserRole), {
//       invalid_type_error: "Role must be 'sender', 'receiver', or 'admin'",
//     }).optional(),
//   }),
// });


// export const changeUserStatusZodSchema = z.object({
//   body: z.object({
//     status: z.enum( Object.values(IUserStatus), {
//       required_error: 'Status is required',
//       invalid_type_error: "Status must be 'active' or 'blocked'",
//     }),
//   }),
// });