// src/modules/parcel/parcel.service.ts

import { Parcel } from './parcel.model';
import { IParcel, ICreateParcelPayload, IUpdateParcelStatusPayload, IParcelStatus } from './parcel.interface';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import httpStatus from "http-status-codes";
import { IUserRole } from '../user/user.interface';
import { Types } from 'mongoose';

const prepareParcelResponse = (parcel: IParcel): IParcel => {
  const { ...rest } = parcel.toJSON();
  return rest as IParcel;
};

// Helper function to generate a unique tracking ID
const generateTrackingId = (): string => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TRK-${formattedDate}-${randomChars}`;
};




const createParcel = async (
  payload: ICreateParcelPayload,
  senderId: string
): Promise<IParcel> => {
  const newParcelData: IParcel = {
    ...payload,
    receiver: {
      ...payload.receiver,
      userId: payload.receiver.userId
        ? new Types.ObjectId(payload.receiver.userId)
        : undefined,
    },
    trackingId: generateTrackingId(),
    sender: new Types.ObjectId(senderId),
    currentStatus: IParcelStatus.Requested,
    isCancelled: false,
    isDelivered: false,
    statusLogs: [
      {
        status: IParcelStatus.Requested,
        timestamp: new Date(),
        updatedBy: new Types.ObjectId(senderId),
        note: 'Parcel delivery request created by sender',
      },
    ],
  };

  const newParcel = await Parcel.create(newParcelData);
  return prepareParcelResponse(newParcel);
};






const getAllParcels = async (): Promise<IParcel[]> => {
  const parcels = await Parcel.find({}).populate('sender').populate('receiver.userId')
  return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
};




const getSingleParcel = async (parcelId: string, user: JwtPayload): Promise<IParcel | null> => {
  const parcel = await Parcel.findById(parcelId)
  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  if (user.role === IUserRole.Admin || parcel.sender.toString() === user.userId || parcel.receiver.userId?.toString() === user.userId) {
    return prepareParcelResponse(parcel as IParcel);
  }

  throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to view this parcel');
};









const cancelParcel = async (parcelId: string, senderId: string): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }
  if (parcel.sender.toString() !== senderId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to cancel this parcel');
  }
  if (parcel.currentStatus !== IParcelStatus.Requested && parcel.currentStatus !== IParcelStatus.Approved) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Parcel cannot be cancelled as it has already been dispatched');
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      isCancelled: true,
      currentStatus: IParcelStatus.Cancelled,
      $push: {
        statusLogs: {
          status: IParcelStatus.Cancelled,
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(senderId),
          note: 'Parcel was cancelled by sender',
        },
      },
    },
    { new: true }
  );

  return prepareParcelResponse(updatedParcel as IParcel);
};


const updateParcelStatus = async (
  parcelId: string,
  payload: IUpdateParcelStatusPayload,
  adminId: string
): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  const currentStatus = parcel.currentStatus;
  const newStatus = payload.status;

  // Add business rule for status flow here
  // ... এখানে আপনার দেওয়া logic থাকবে ...
  if (
    (currentStatus === IParcelStatus.Requested && newStatus !== IParcelStatus.Approved && newStatus !== IParcelStatus.Cancelled && newStatus !== IParcelStatus.Held) ||
    (currentStatus === IParcelStatus.Approved && newStatus !== IParcelStatus.Dispatched && newStatus !== IParcelStatus.Cancelled && newStatus !== IParcelStatus.Held) ||
    // ... add more rules for the rest of the status flow
    (currentStatus === IParcelStatus.Delivered)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, `Cannot change status from ${currentStatus} to ${newStatus}`);
  }

  // Also, you need to check if the parcel is already delivered or cancelled
  if (parcel.isCancelled || parcel.isDelivered) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot update a cancelled or delivered parcel.');
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      currentStatus: newStatus,
      $push: {
        statusLogs: {
          status: newStatus, 
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(adminId),
          location: payload.location,
          note: payload.note,
        },
      },
    },
    { new: true }
  );

  return prepareParcelResponse(updatedParcel as IParcel);
};





const getMyParcels = async (senderId: string): Promise<IParcel[]> => {
  const parcels = await Parcel.find({ sender: new Types.ObjectId(senderId) }).populate('sender').populate('receiver.userId')
  return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
};

const getIncomingParcels = async (receiverId: string): Promise<IParcel[]> => {
  const parcels = await Parcel.find({ 'receiver.userId': new Types.ObjectId(receiverId) }).populate('sender');
  return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
};


// const deleteParcel = async (parcelId: string): Promise<IParcel | null> => {
//   const deletedParcel = await Parcel.findByIdAndDelete(parcelId).lean();
//   if (!deletedParcel) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
//   }
//   return prepareParcelResponse(deletedParcel as IParcel);
// };

export const ParcelServices = {
  createParcel,
  getAllParcels,
  getMyParcels,
  getSingleParcel,
  getIncomingParcels,
  cancelParcel,
  updateParcelStatus,
};