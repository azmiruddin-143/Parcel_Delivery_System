
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ParcelServices } from "./parcel.service";

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
    const result = await ParcelServices.getAllParcels();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Parcel Retrieved Successfully",
        data: result,
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



    const result = await ParcelServices.getMyParcels(senderId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sender\'s parcels retrieved successfully',
        data: result,
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
    const result = await ParcelServices.getIncomingParcels(receiverId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Receiver\'s incoming parcels retrieved successfully',
        data: result,
    });
});

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




export const ParcelControllers = {
    createParcel,
    getAllParcel,
    updateParcelStatus,
    cancelParcel,
    getSingleParcel,
    getMyParcels,
    getIncomingParcels

}

