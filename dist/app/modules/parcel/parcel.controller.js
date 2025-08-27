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
const updateParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const user = req.user as JwtPayload;
    const { body } = req;
    const result = yield parcel_service_1.ParcelServices.updateParcel(id, body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
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
const updateParcelBlockStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    let isBlocked = false;
    let note = '';
    // Check the URL path to determine if it's a block or unblock request
    if (req.originalUrl.includes('/block')) {
        isBlocked = true;
        note = 'Parcel was blocked by admin.';
    }
    else if (req.originalUrl.includes('/unblock')) {
        isBlocked = false;
        note = 'Parcel was unblocked by admin.';
    }
    const result = yield parcel_service_1.ParcelServices.updateParcelBlockStatus(id, isBlocked, adminId, note);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: `Parcel ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
        data: result,
    });
});
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
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 50,
    };
    const result = yield parcel_service_1.ParcelServices.getAllParcels(filters, pagination);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "All Parcel Retrieved Successfully",
        data: result,
        // data: result.data,
        // meta: result.meta,
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
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = yield parcel_service_1.ParcelServices.getMyParcels(senderId.toString(), filters, pagination);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Sender\'s parcels retrieved successfully',
        data: result,
        // data: result.data,
        // meta: result.meta,
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
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = yield parcel_service_1.ParcelServices.getIncomingParcels(receiverId.toString(), filters, pagination);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Receiver\'s incoming parcels retrieved successfully',
        data: result,
        // data: result.data,
        // meta: result.meta,
    });
}));
const confirmDelivery = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const { id } = req.params;
    const receiverId = req.user._id;
    const result = yield parcel_service_1.ParcelServices.confirmDelivery(id, receiverId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Delivery confirmed successfully',
        data: result,
    });
}));
const getPublicParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackingId } = req.params;
    const result = yield parcel_service_1.ParcelServices.getPublicParcel(trackingId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Parcel details retrieved successfully',
        data: result,
    });
}));
const getParcelStats = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelServices.getParcelStats();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Parcel statistics retrieved successfully',
        data: result,
    });
}));
const getDeliveredParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverId = req.user._id;
    const pagination = { page: 1, limit: 50 };
    const result = yield parcel_service_1.ParcelServices.getDeliveredParcels(receiverId, pagination);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Delivered parcels retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
}));
const deleteParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield parcel_service_1.ParcelServices.deleteParcel(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel deleted successfully',
        data: result,
    });
}));
exports.ParcelControllers = {
    createParcel,
    updateParcel,
    getAllParcel,
    updateParcelStatus,
    updateParcelBlockStatus,
    cancelParcel,
    getSingleParcel,
    getMyParcels,
    getIncomingParcels,
    confirmDelivery,
    getDeliveredParcels,
    getPublicParcel,
    getParcelStats,
    deleteParcel
};
