// src/modules/parcel/parcel.interface.ts

import { Types } from 'mongoose';


export enum IParcelStatus {
    Requested='Requested',
    Approved='Approved',
    Dispatched="Dispatched",
    Picked='Picked',
    InTransit='In Transit',
    Held="Held",
    Delivered="Delivered",
    Returned="Returned",
    Cancelled="Cancelled"
    
    
}

 
export interface IStatusLog {
  status:IParcelStatus;
  timestamp:Date;
  location?:string; // Optional: e.g., "Dhaka Hub"
  updatedBy?:Types.ObjectId; // User ID of admin/system who updated the status
  note?:string; // Optional: e.g., "Customer unavailable"
}


export interface IParcel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  _id?: Types.ObjectId;
  trackingId: string;
  sender: Types.ObjectId; // Reference to the 'User' model
  receiver: {
    name: string;
    phone: string;
    address: string;
    userId?: Types.ObjectId; // Optional: reference if receiver is a registered user
  };
  parcelType: string; // e.g., "Document", "Electronics"
  weight: number; // in KG
  deliveryAddress: string;
  currentStatus: IParcelStatus;
  parcelFee?: number; // Optional: based on weight, distance, etc.
  estimatedDeliveryDate?: Date; // Optional
  isCancelled: boolean;
  isDelivered: boolean;
  isBlocked?: boolean; // Optional: Admin can block a parcel
  statusLogs: IStatusLog[]; // Array of status updates
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ICreateParcelPayload {
  receiver: {
    name: string;
    phone: string;
    address: string;
    userId?: string; // Can be the receiver's ID
  };
  parcelType: string;
  weight: number;
  deliveryAddress: string;
}


export interface IUpdateParcelStatusPayload {
  status: IParcelStatus;
  location?: string;
  note?: string;
}