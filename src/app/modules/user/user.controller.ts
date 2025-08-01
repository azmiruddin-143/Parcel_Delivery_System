
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
    deleteUser
}

