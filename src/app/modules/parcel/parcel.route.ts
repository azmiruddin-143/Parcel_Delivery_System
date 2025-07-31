// src/modules/parcel/parcel.routes.ts
import express from 'express';
import { ParcelControllers } from './parcel.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { IUserRole } from '../user/user.interface';
 // Assuming you have these validation schemas

const router = express.Router();


router.post("/", checkAuth(IUserRole.Sender),ParcelControllers.createParcel)

// 2. Get all parcels (Admin only)
// GET /api/v1/parcels

router.get("/all-parcels", checkAuth(IUserRole.Admin),ParcelControllers.getAllParcel)


// 3. Get my parcels (Sender only)
// GET /api/v1/parcels/my
router.get("/my", checkAuth(IUserRole.Sender),ParcelControllers.getMyParcels)


// 4. Get incoming parcels (Receiver only)
// GET /api/v1/parcels/incoming
router.get("/incoming", checkAuth(IUserRole.Receiver),ParcelControllers.getIncomingParcels)


// 5. Get a single parcel by ID (Admin, Sender, Receiver)
// GET /api/v1/parcels/:id
router.get("/:id", checkAuth(...Object.values(IUserRole)),ParcelControllers.getSingleParcel)



// 6. Cancel a parcel (Sender only)
// PATCH /api/v1/parcels/:id/cancel


router.patch("/:id/cancel", checkAuth(IUserRole.Sender),ParcelControllers.cancelParcel)

// 7. Update a parcel's status (Admin only)
// PATCH /api/v1/parcels/:id/status

router.patch("/:id/status", checkAuth(IUserRole.Admin),ParcelControllers.updateParcelStatus)



// 8. Delete a parcel (Admin only, Optional)
// DELETE /api/v1/parcels/:id
// This route is commented out as per your previous discussion.
/*
router.delete(
  '/:id',
  auth(),
  authorize(['admin']), // Only admins can delete parcels
  ParcelControllers.deleteParcel
);
*/

export const parcelRoutes = router;