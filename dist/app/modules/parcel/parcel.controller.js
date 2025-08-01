"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const parcel_service_1 = require("./parcel.service");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const senderId = req.user._id;
    const parcel = yield parcel_service_1.ParcelServices.createParcel(req.body, senderId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel Created Successfully",
        data: parcel,
    });
}));
const updateParcelStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const adminId = req.user._id;
    const { status, location, note } = req.body;
    const result = yield parcel_service_1.ParcelServices.updateParcelStatus(id, { status, location, note }, adminId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Parcel status updated successfully",
        data: result,
    });
}));
const cancelParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const senderId = req.user._id;
    const result = yield parcel_service_1.ParcelServices.cancelParcel(id, senderId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Parcel cancelled successfully",
        data: result,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelServices.getAllParcels();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "All Parcel Retrieved Successfully",
        data: result,
    });
}));
const getSingleParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const user = req.user;
    const result = yield parcel_service_1.ParcelServices.getSingleParcel(id, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Single Parcel Retrieved Successfully',
        data: result,
    });
}));
const getMyParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const senderId = req.user._id;
    const result = yield parcel_service_1.ParcelServices.getMyParcels(senderId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Sender\'s parcels retrieved successfully',
        data: result,
    });
}));
/**
 * Controller for retrieving parcels intended for the authenticated receiver.
 */
const getIncomingParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const receiverId = req.user._id;
    const result = yield parcel_service_1.ParcelServices.getIncomingParcels(receiverId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Receiver\'s incoming parcels retrieved successfully',
        data: result,
    });
}));
// const deleteParcel = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await ParcelServices.deleteParcel(id);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: 'Parcel deleted successfully',
//         data: result,
//     });
// });
exports.ParcelControllers = {
    createParcel,
    getAllParcel,
    updateParcelStatus,
    cancelParcel,
    getSingleParcel,
    getMyParcels,
    getIncomingParcels
};
