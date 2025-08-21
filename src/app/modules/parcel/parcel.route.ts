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

// ----- নন-প্যারামিটার রুটগুলো আগে রাখুন -----
router.get('/stats', checkAuth(IUserRole.Admin), ParcelControllers.getParcelStats);
router.get('/all-parcels', checkAuth(IUserRole.Admin), ParcelControllers.getAllParcel);
router.get('/my', checkAuth(IUserRole.Sender), ParcelControllers.getMyParcels);
router.get("/incoming", checkAuth(IUserRole.Receiver), ParcelControllers.getIncomingParcels);
router.post("/", validateRequest(createParcelZodSchema), checkAuth(IUserRole.Sender), ParcelControllers.createParcel);


// ----- প্যারামিটারসহ রুটগুলো পরে রাখুন -----
router.get('/track/:trackingId', ParcelControllers.getPublicParcel);
router.get("/:id", checkAuth(...Object.values(IUserRole)), ParcelControllers.getSingleParcel);
router.patch("/:id/confirm-delivery", checkAuth(IUserRole.Receiver), ParcelControllers.confirmDelivery);
router.patch("/:id/cancel", checkAuth(IUserRole.Sender), ParcelControllers.cancelParcel);
router.patch("/:id/status",validateRequest(updateParcelStatusZodSchema) , checkAuth(IUserRole.Admin), ParcelControllers.updateParcelStatus);




export const parcelRoutes = router;