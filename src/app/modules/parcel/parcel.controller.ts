
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ParcelServices } from "./parcel.service";
import { JwtPayload } from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }

    const senderId = req.user._id;

    const parcel = await ParcelServices.createParcel(req.body, senderId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel Created Successfully",
        data: parcel,
    })
})


const updateParcel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // const user = req.user as JwtPayload;
    const { body } = req;

    const result = await ParcelServices.updateParcel(id, body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
});


const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const adminId = req.user._id;
    const { status, location, note } = req.body;

    const result = await ParcelServices.updateParcelStatus(id, { status, location, note }, adminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel status updated successfully",
        data: result,
    });
});

const updateParcelBlockStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const adminId = req.user?.userId;
    let isBlocked = false;
    let note = '';

    // Check the URL path to determine if it's a block or unblock request
    if (req.originalUrl.includes('/block')) {
        isBlocked = true;
        note = 'Parcel was blocked by admin.';
    } else if (req.originalUrl.includes('/unblock')) {
        isBlocked = false;
        note = 'Parcel was unblocked by admin.';
    }

    const result = await ParcelServices.updateParcelBlockStatus(id, isBlocked, adminId, note);
    res.status(httpStatus.OK).json({
        success: true,
        message: `Parcel ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
        data: result,
    });

};

const cancelParcel = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const senderId = req.user._id;


    const result = await ParcelServices.cancelParcel(id, senderId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel cancelled successfully",
        data: result,
    });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 50,
    };

    const result = await ParcelServices.getAllParcels(filters, pagination);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Parcel Retrieved Successfully",
        data: result,
        // data: result.data,
        // meta: result.meta,
    })
})




const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const user = req.user;

    const result = await ParcelServices.getSingleParcel(id, user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Single Parcel Retrieved Successfully',
        data: result,
    });
});




const getMyParcels = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }

    const senderId = req.user._id;
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await ParcelServices.getMyParcels(senderId.toString(), filters, pagination)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sender\'s parcels retrieved successfully',
        data: result,
        // data: result.data,
        // meta: result.meta,
    });
});

/**
 * Controller for retrieving parcels intended for the authenticated receiver.
 */
const getIncomingParcels = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const receiverId = req.user._id;
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await ParcelServices.getIncomingParcels(receiverId.toString(), filters, pagination);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Receiver\'s incoming parcels retrieved successfully',
        data: result,
        // data: result.data,
        // meta: result.meta,
    });
});


const confirmDelivery = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error('Unauthorized: User not found in request');
    }
    const { id } = req.params;
    const receiverId = req.user._id;
    const result = await ParcelServices.confirmDelivery(id, receiverId as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delivery confirmed successfully',
        data: result,
    });
});


const getPublicParcel = catchAsync(async (req: Request, res: Response) => {
    const { trackingId } = req.params;
    const result = await ParcelServices.getPublicParcel(trackingId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parcel details retrieved successfully',
        data: result,
    });
});


const getParcelStats = catchAsync(async (req: Request, res: Response) => {
    const result = await ParcelServices.getParcelStats();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parcel statistics retrieved successfully',
        data: result,
    });
});

const getDeliveredParcels = catchAsync(async (req: Request, res: Response) => {
    const receiverId = (req.user as JwtPayload)._id;

    const pagination = { page: 1, limit: 50 };
    const result = await ParcelServices.getDeliveredParcels(receiverId, pagination);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delivered parcels retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});


const deleteParcel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ParcelServices.deleteParcel(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel deleted successfully',
        data: result,
    });
});




export const ParcelControllers = {
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

}

