"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelRoutes = void 0;
// src/modules/parcel/parcel.routes.ts
const express_1 = __importDefault(require("express"));
const parcel_controller_1 = require("./parcel.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
// Assuming you have these validation schemas
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.createParcel);
// 2. Get all parcels (Admin only)
// GET /api/v1/parcels
router.get("/all-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.getAllParcel);
// 3. Get my parcels (Sender only)
// GET /api/v1/parcels/my
router.get("/my", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.getMyParcels);
// 4. Get incoming parcels (Receiver only)
// GET /api/v1/parcels/incoming
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Receiver), parcel_controller_1.ParcelControllers.getIncomingParcels);
// 5. Get a single parcel by ID (Admin, Sender, Receiver)
// GET /api/v1/parcels/:id
router.get("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.IUserRole)), parcel_controller_1.ParcelControllers.getSingleParcel);
// 6. Cancel a parcel (Sender only)
// PATCH /api/v1/parcels/:id/cancel
router.patch("/:id/cancel", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.cancelParcel);
// 7. Update a parcel's status (Admin only)
// PATCH /api/v1/parcels/:id/status
router.patch("/:id/status", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.updateParcelStatus);
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
exports.parcelRoutes = router;
