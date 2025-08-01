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
const validateRequest_1 = require("../../middlewares/validateRequest");
const parcel_validate_1 = require("./parcel.validate");
// Assuming you have these validation schemas
//  /api/v1/
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(parcel_validate_1.createParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.createParcel);
router.get("/all-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.getAllParcel);
router.get("/my", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.getMyParcels);
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Receiver), parcel_controller_1.ParcelControllers.getIncomingParcels);
router.get("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.IUserRole)), parcel_controller_1.ParcelControllers.getSingleParcel);
router.patch("/:id/cancel", (0, validateRequest_1.validateRequest)(parcel_validate_1.updateParcelStatusZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.cancelParcel);
router.patch("/:id/status", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.updateParcelStatus);
exports.parcelRoutes = router;
