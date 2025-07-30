import { model, Schema } from "mongoose";
import { IUser, IUserRole, IUserStatus } from "./user.interface";


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.values(IUserRole),
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      sparse: true, 
    },
    address: {
      type: String,
      trim: true,
    },
     status: {
      type: String,
      enum: Object.values(IUserStatus),
      default: IUserStatus.Active,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);


export const User = model<IUser>("User",userSchema)