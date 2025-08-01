import { Types } from "mongoose";

export enum IUserRole {
    Admin = "Admin",
    Sender = "Sender",
    Receiver = "Receiver",
}

export enum IUserStatus {
    Active = "Active",
    Blocked = "Blocked"
}



export interface IUser {
    _id?: Types.ObjectId; 
    name: string;
    email: string;
    password?: string; 
    role: IUserRole;
    phone?: string;
    address?: string;
    status: IUserStatus;
    createdAt?: Date;
    updatedAt?: Date;

}
// export interface IRegisteredUserResponse {
//     _id: Types.ObjectId;
//     name: string;
//     email: string;
//     role: IUserRole;
//     status: IUserStatus;
//     phone?: string;
//     address?: string;
//     createdAt: Date;
//     updatedAt: Date;
// }


// export interface IUpdateUserPayload {
//     name?: string;
//     email?: string;
//     phone?: string;
//     address?: string;
//     status?: IUserStatus;
//     role?: IUserRole;
// }