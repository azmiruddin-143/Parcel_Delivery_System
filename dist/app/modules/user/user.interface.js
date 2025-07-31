"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUserStatus = exports.IUserRole = void 0;
var IUserRole;
(function (IUserRole) {
    IUserRole["Admin"] = "Admin";
    IUserRole["Sender"] = "Sender";
    IUserRole["Receiver"] = "Receiver";
})(IUserRole || (exports.IUserRole = IUserRole = {}));
var IUserStatus;
(function (IUserStatus) {
    IUserStatus["Active"] = "Active";
    IUserStatus["Blocked"] = "Blocked";
})(IUserStatus || (exports.IUserStatus = IUserStatus = {}));
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
