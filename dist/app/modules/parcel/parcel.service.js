"use strict";
// src/modules/parcel/parcel.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelServices = void 0;
const parcel_model_1 = require("./parcel.model");
const parcel_interface_1 = require("./parcel.interface");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
const mongoose_1 = require("mongoose");
const prepareParcelResponse = (parcel) => {
    const rest = __rest(parcel.toJSON(), []);
    return rest;
};
// Helper function to generate a unique tracking ID
const generateTrackingId = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `TRK-${formattedDate}-${randomChars}`;
};
const createParcel = (payload, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const newParcelData = Object.assign(Object.assign({}, payload), { receiver: Object.assign(Object.assign({}, payload.receiver), { userId: payload.receiver.userId
                ? new mongoose_1.Types.ObjectId(payload.receiver.userId)
                : undefined }), trackingId: generateTrackingId(), sender: new mongoose_1.Types.ObjectId(senderId), currentStatus: parcel_interface_1.IParcelStatus.Requested, isCancelled: false, isDelivered: false, statusLogs: [
            {
                status: parcel_interface_1.IParcelStatus.Requested,
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(senderId),
                note: 'Parcel delivery request created by sender',
            },
        ] });
    const newParcel = yield parcel_model_1.Parcel.create(newParcelData);
    return prepareParcelResponse(newParcel);
});
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({}).populate('sender').populate('receiver.userId');
    return parcels.map(parcel => prepareParcelResponse(parcel));
});
const getSingleParcel = (parcelId, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    if (user.role === user_interface_1.IUserRole.Admin || parcel.sender.toString() === user.userId || ((_a = parcel.receiver.userId) === null || _a === void 0 ? void 0 : _a.toString()) === user.userId) {
        return prepareParcelResponse(parcel);
    }
    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not authorized to view this parcel');
});
const cancelParcel = (parcelId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    if (parcel.sender.toString() !== senderId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not authorized to cancel this parcel');
    }
    if (parcel.currentStatus !== parcel_interface_1.IParcelStatus.Requested && parcel.currentStatus !== parcel_interface_1.IParcelStatus.Approved) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Parcel cannot be cancelled as it has already been dispatched');
    }
    const updatedParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(parcelId, {
        isCancelled: true,
        currentStatus: parcel_interface_1.IParcelStatus.Cancelled,
        $push: {
            statusLogs: {
                status: parcel_interface_1.IParcelStatus.Cancelled,
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(senderId),
                note: 'Parcel was cancelled by sender',
            },
        },
    }, { new: true });
    return prepareParcelResponse(updatedParcel);
});
const updateParcelStatus = (parcelId, payload, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    const currentStatus = parcel.currentStatus;
    const newStatus = payload.status;
    // Add business rule for status flow here
    // ... এখানে আপনার দেওয়া logic থাকবে ...
    if ((currentStatus === parcel_interface_1.IParcelStatus.Requested && newStatus !== parcel_interface_1.IParcelStatus.Approved && newStatus !== parcel_interface_1.IParcelStatus.Cancelled && newStatus !== parcel_interface_1.IParcelStatus.Held) ||
        (currentStatus === parcel_interface_1.IParcelStatus.Approved && newStatus !== parcel_interface_1.IParcelStatus.Dispatched && newStatus !== parcel_interface_1.IParcelStatus.Cancelled && newStatus !== parcel_interface_1.IParcelStatus.Held) ||
        // ... add more rules for the rest of the status flow
        (currentStatus === parcel_interface_1.IParcelStatus.Delivered)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Cannot change status from ${currentStatus} to ${newStatus}`);
    }
    // Also, you need to check if the parcel is already delivered or cancelled
    if (parcel.isCancelled || parcel.isDelivered) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Cannot update a cancelled or delivered parcel.');
    }
    const updatedParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(parcelId, {
        currentStatus: newStatus,
        $push: {
            statusLogs: {
                status: newStatus,
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(adminId),
                location: payload.location,
                note: payload.note,
            },
        },
    }, { new: true });
    return prepareParcelResponse(updatedParcel);
});
const getMyParcels = (senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({ sender: new mongoose_1.Types.ObjectId(senderId) }).populate('sender').populate('receiver.userId');
    return parcels.map(parcel => prepareParcelResponse(parcel));
});
const getIncomingParcels = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({ 'receiver.userId': new mongoose_1.Types.ObjectId(receiverId) }).populate('sender');
    return parcels.map(parcel => prepareParcelResponse(parcel));
});
// const deleteParcel = async (parcelId: string): Promise<IParcel | null> => {
//   const deletedParcel = await Parcel.findByIdAndDelete(parcelId).lean();
//   if (!deletedParcel) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
//   }
//   return prepareParcelResponse(deletedParcel as IParcel);
// };
exports.ParcelServices = {
    createParcel,
    getAllParcels,
    getMyParcels,
    getSingleParcel,
    getIncomingParcels,
    cancelParcel,
    updateParcelStatus,
};
