// src/modules/parcel/parcel.routes.ts
import express from 'express';
import { ParcelControllers } from './parcel.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { IUserRole } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createParcelZodSchema, updateParcelStatusZodSchema } from './parcel.validate';
 // Assuming you have these validation schemas

//  /api/v1/


const router = express.Router();


router.post("/", validateRequest(createParcelZodSchema), checkAuth(IUserRole.Sender),ParcelControllers.createParcel)

router.get("/all-parcels", checkAuth(IUserRole.Admin),ParcelControllers.getAllParcel)
router.get("/my", checkAuth(IUserRole.Sender),ParcelControllers.getMyParcels)
router.get("/incoming", checkAuth(IUserRole.Receiver),ParcelControllers.getIncomingParcels)
router.get("/:id", checkAuth(...Object.values(IUserRole)),ParcelControllers.getSingleParcel)
router.patch("/:id/cancel",validateRequest(updateParcelStatusZodSchema), checkAuth(IUserRole.Sender),ParcelControllers.cancelParcel)
router.patch("/:id/status", checkAuth(IUserRole.Admin),ParcelControllers.updateParcelStatus)



export const parcelRoutes = router;