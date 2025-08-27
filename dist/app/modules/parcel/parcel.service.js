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
const user_model_1 = require("../user/user.model");
const prepareParcelResponse = (parcel) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createParcel = (payload, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverUser = yield user_model_1.User.findOne({ email: payload.receiver.email }).lean();
    if (!receiverUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Receiver not found with this email.");
    }
    if (receiverUser.role !== user_interface_1.IUserRole.Receiver) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Parcel can only be sent to a user with the role of '${user_interface_1.IUserRole.Receiver}'.`);
    }
    if (receiverUser._id.toString() === senderId.toString()) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You cannot send a parcel to yourself.");
    }
    const newParcelData = {
        parcelType: payload.parcelType,
        weight: payload.weight,
        deliveryAddress: payload.deliveryAddress,
        trackingId: generateTrackingId(),
        sender: new mongoose_1.Types.ObjectId(senderId),
        receiver: {
            name: payload.receiver.name,
            phone: payload.receiver.phone,
            email: payload.receiver.email,
            address: payload.receiver.address,
            userId: receiverUser._id,
        },
        currentStatus: parcel_interface_1.IParcelStatus.Requested,
        isCancelled: false,
        isDelivered: false,
        statusLogs: [
            {
                status: parcel_interface_1.IParcelStatus.Requested,
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(senderId),
                note: 'Parcel delivery request created by sender',
            },
        ],
    };
    const newParcel = yield parcel_model_1.Parcel.create(newParcelData);
    return prepareParcelResponse(newParcel);
});
const updateParcel = (parcelId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // ১. পার্সেল খুঁজে বের করা
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found!');
    }
    if (parcel.currentStatus !== 'Requested' && parcel.currentStatus !== 'Cancelled') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You can only edit parcels with "Requested" or "Cancelled" status.');
    }
    if (payload.receiver && payload.receiver.email) {
        const receiverUser = yield user_model_1.User.findOne({ email: payload.receiver.email });
        if (!receiverUser) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Receiver not found with this email.");
        }
        if (receiverUser.role !== user_interface_1.IUserRole.Receiver) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Parcel can only be sent to a user with the role of '${user_interface_1.IUserRole.Receiver}'.`);
        }
        // রিসিভারের পুরো অবজেক্ট আপডেট করা
        payload.receiver = Object.assign(Object.assign(Object.assign({}, parcel.receiver), payload.receiver), { userId: receiverUser._id });
    }
    // ৫. পার্সেল আপডেট করা
    const result = yield parcel_model_1.Parcel.findByIdAndUpdate(parcelId, payload, { new: true, runValidators: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "Failed to update the parcel.");
    }
    return prepareParcelResponse(result);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllParcels = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 50 } = pagination;
    const skip = (page - 1) * limit;
    const total = yield parcel_model_1.Parcel.countDocuments(filters);
    const parcels = yield parcel_model_1.Parcel.find(filters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');
    const data = parcels.map(parcel => prepareParcelResponse(parcel));
    const meta = { page, limit, total };
    return { data, meta };
});
const getSingleParcel = (parcelId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId).populate('sender');
    console.log("ppp", parcel);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    // if (user.role === IUserRole.Admin || parcel.sender.toString() === user.userId || parcel.receiver.userId?.toString() === user.userId) {
    //   return prepareParcelResponse(parcel as IParcel);
    // }
    if (user.role === user_interface_1.IUserRole.Admin || user.role === user_interface_1.IUserRole.Sender || user.role === user_interface_1.IUserRole.Receiver) {
        return prepareParcelResponse(parcel);
    }
    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not authorized to view this parcel');
});
// src/modules/parcel/parcel.service.ts
const cancelParcel = (parcelId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    if (parcel.sender.toString() !== senderId.toString()) {
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
                updatedBy: new mongoose_1.Types.ObjectId(senderId.toString()),
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
    if ((currentStatus === parcel_interface_1.IParcelStatus.Requested && newStatus !== parcel_interface_1.IParcelStatus.Approved && newStatus !== parcel_interface_1.IParcelStatus.Cancelled && newStatus !== parcel_interface_1.IParcelStatus.Held) ||
        (currentStatus === parcel_interface_1.IParcelStatus.Approved && newStatus !== parcel_interface_1.IParcelStatus.Dispatched && newStatus !== parcel_interface_1.IParcelStatus.Cancelled && newStatus !== parcel_interface_1.IParcelStatus.Held) ||
        (currentStatus === parcel_interface_1.IParcelStatus.Dispatched && newStatus !== parcel_interface_1.IParcelStatus.InTransit && newStatus !== parcel_interface_1.IParcelStatus.Delivered) ||
        (currentStatus === parcel_interface_1.IParcelStatus.InTransit && newStatus !== parcel_interface_1.IParcelStatus.Delivered) ||
        (currentStatus === parcel_interface_1.IParcelStatus.Delivered || currentStatus === parcel_interface_1.IParcelStatus.Cancelled || currentStatus === parcel_interface_1.IParcelStatus.Returned)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Cannot change status from ${currentStatus} to ${newStatus}`);
    }
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
// const getMyParcels = async (senderId: string): Promise<IParcel[]> => {
//   const parcels = await Parcel.find({ sender: new Types.ObjectId(senderId) }).populate('sender').populate('receiver.userId')
//   return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMyParcels = (senderId, filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const queryFilters = Object.assign(Object.assign({}, filters), { sender: new mongoose_1.Types.ObjectId(senderId) });
    const total = yield parcel_model_1.Parcel.countDocuments(queryFilters);
    const parcels = yield parcel_model_1.Parcel.find(queryFilters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');
    const data = parcels.map(parcel => prepareParcelResponse(parcel));
    const meta = { page, limit, total };
    return { data, meta };
});
// const getIncomingParcels = async (receiverId: string): Promise<IParcel[]> => {
//   const parcels = await Parcel.find({ 'receiver.userId': new Types.ObjectId(receiverId) }).populate('sender').populate('receiver.userId');
//   return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIncomingParcels = (receiverId, filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const queryFilters = Object.assign(Object.assign({}, filters), { 'receiver.userId': new mongoose_1.Types.ObjectId(receiverId) });
    const total = yield parcel_model_1.Parcel.countDocuments(queryFilters);
    const parcels = yield parcel_model_1.Parcel.find(queryFilters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');
    const data = parcels.map(parcel => prepareParcelResponse(parcel));
    const meta = { page, limit, total };
    return { data, meta };
});
const confirmDelivery = (parcelId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    // Authorization: Check if the logged-in user is the actual receiver
    if (((_a = parcel.receiver.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== receiverId.toString()) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not authorized to confirm this delivery');
    }
    // Business Rule: Check if the parcel is in the correct status for delivery confirmation
    if (parcel.currentStatus !== parcel_interface_1.IParcelStatus.InTransit) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Parcel status must be "In Transit" to be confirmed as delivered.');
    }
    // Update parcel status
    const updatedParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(parcelId, {
        isDelivered: true,
        currentStatus: parcel_interface_1.IParcelStatus.Delivered,
        $push: {
            statusLogs: {
                status: parcel_interface_1.IParcelStatus.Delivered,
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(receiverId.toString()),
                note: 'Delivery confirmed by receiver.',
            },
        },
    }, { new: true });
    return prepareParcelResponse(updatedParcel);
});
// New service function for blocking a parcel
const updateParcelBlockStatus = (parcelId, isBlocked, adminId, note) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    // Check if the parcel is already in the desired state
    if (parcel.isBlocked === isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Parcel is already ${isBlocked ? 'blocked' : 'unblocked'}.`);
    }
    const updatedParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(parcelId, {
        isBlocked: isBlocked,
        $push: {
            statusLogs: {
                status: isBlocked ? parcel_interface_1.IParcelStatus.Held : parcel.currentStatus, // If blocked, status can be 'Held'. Or you can create a new status for blocked
                timestamp: new Date(),
                updatedBy: new mongoose_1.Types.ObjectId(adminId),
                note: note || `Parcel was ${isBlocked ? 'blocked' : 'unblocked'}.`,
            },
        },
    }, { new: true });
    return updatedParcel;
});
const getPublicParcel = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId }).lean();
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    // You might want to remove sensitive data like sender/receiver IDs here
    // But since you're using lean(), it's a good practice to ensure it's not exposed.
    // For now, prepareParcelResponse should be sufficient.
    return parcel;
});
const getParcelStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield parcel_model_1.Parcel.aggregate([
        {
            $group: {
                _id: null,
                totalParcels: { $sum: 1 },
                deliveredCount: {
                    $sum: {
                        $cond: [{ $eq: ['$currentStatus', parcel_interface_1.IParcelStatus.Delivered] }, 1, 0]
                    }
                },
                inTransitCount: {
                    $sum: {
                        $cond: [{ $eq: ['$currentStatus', parcel_interface_1.IParcelStatus.InTransit] }, 1, 0]
                    }
                },
                approvedCount: {
                    $sum: {
                        $cond: [{ $eq: ['$currentStatus', parcel_interface_1.IParcelStatus.Approved] }, 1, 0]
                    }
                },
                returnedCount: {
                    $sum: {
                        $cond: [{ $eq: ['$currentStatus', parcel_interface_1.IParcelStatus.Returned] }, 1, 0]
                    }
                },
                cancelledCount: {
                    $sum: {
                        $cond: [{ $eq: ['$currentStatus', parcel_interface_1.IParcelStatus.Cancelled] }, 1, 0]
                    }
                },
            }
        },
        {
            $project: {
                _id: 0,
                totalParcels: 1,
                deliveredCount: 1,
                inTransitCount: 1,
                approvedCount: 1,
                returnedCount: 1,
                cancelledCount: 1,
            }
        }
    ]);
    // If no parcels are found, return default values of 0
    return stats[0] || {
        totalParcels: 0,
        deliveredCount: 0,
        inTransitCount: 0,
        approvedCount: 0,
        returnedCount: 0,
        cancelledCount: 0,
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDeliveredParcels = (receiverId, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 50 } = pagination;
    const skip = (page - 1) * limit;
    const queryFilters = { currentStatus: parcel_interface_1.IParcelStatus.Delivered, 'receiver.userId': new mongoose_1.Types.ObjectId(receiverId) };
    const total = yield parcel_model_1.Parcel.countDocuments(queryFilters);
    const parcels = yield parcel_model_1.Parcel.find(queryFilters)
        .skip(skip)
        .limit(limit)
        .populate('sender')
        .populate('receiver.userId');
    const data = parcels.map(parcel => prepareParcelResponse(parcel));
    const meta = { page, limit, total };
    return { data, meta };
});
const deleteParcel = (parcelId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelToDelete = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcelToDelete) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    if (parcelToDelete.currentStatus !== 'Requested' && parcelToDelete.currentStatus !== 'Cancelled') {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You can only delete parcels with "Requested" or "Cancelled" status.');
    }
    const deletedParcel = yield parcel_model_1.Parcel.findByIdAndDelete(parcelId);
    if (!deletedParcel) {
        throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete the parcel');
    }
    return prepareParcelResponse(deletedParcel);
});
exports.ParcelServices = {
    createParcel,
    updateParcel,
    getAllParcels,
    getMyParcels,
    getSingleParcel,
    getIncomingParcels,
    cancelParcel,
    updateParcelStatus,
    updateParcelBlockStatus,
    deleteParcel,
    confirmDelivery,
    getPublicParcel,
    getDeliveredParcels,
    getParcelStats
};
