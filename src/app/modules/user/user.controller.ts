
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user as JwtPayload;;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})


const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Single User Retrieved Successfully',
        data: result,
    });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken._id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result
    })
})

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { status } = req.body; 

  const updatedUser = await UserServices.changeUserStatus(id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully',
    data: updatedUser,
  });
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stats = await UserServices.getUserStats();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User stats retrieved successfully",
        data: stats,
    });
});

const searchUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.query;
    const user = await UserServices.searchUserByEmail(email as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User found',
        data: user,
    });
});



const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.deleteUser(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});






export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getSingleUser,
    changeUserStatus,
    getUserStats,
    searchUserByEmail,
    getMe,
    deleteUser
}

