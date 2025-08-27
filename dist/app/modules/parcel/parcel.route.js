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
// ----- নন-প্যারামিটার রুটগুলো আগে রাখুন -----
router.get('/stats', (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.getParcelStats);
router.get("/delivered", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin, user_interface_1.IUserRole.Receiver), parcel_controller_1.ParcelControllers.getDeliveredParcels);
router.get('/allparcels', (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.getAllParcel);
router.get('/my', (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.getMyParcels);
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Receiver), parcel_controller_1.ParcelControllers.getIncomingParcels);
router.post("/", (0, validateRequest_1.validateRequest)(parcel_validate_1.createParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.createParcel);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin, user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.deleteParcel);
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin, user_interface_1.IUserRole.Sender), (0, validateRequest_1.validateRequest)(parcel_validate_1.updateParcelValidationSchema), parcel_controller_1.ParcelControllers.updateParcel);
// ----- প্যারামিটারসহ রুটগুলো পরে রাখুন -----
router.get('/track/:trackingId', parcel_controller_1.ParcelControllers.getPublicParcel);
router.get("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.IUserRole)), parcel_controller_1.ParcelControllers.getSingleParcel);
router.patch("/:id/confirm-delivery", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Receiver), parcel_controller_1.ParcelControllers.confirmDelivery);
router.patch("/:id/cancel", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Sender), parcel_controller_1.ParcelControllers.cancelParcel);
router.patch("/:id/status", (0, validateRequest_1.validateRequest)(parcel_validate_1.updateParcelStatusZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.updateParcelStatus);
router.patch("/:id/block", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.updateParcelBlockStatus);
router.patch("/:id/unblock", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.Admin), parcel_controller_1.ParcelControllers.updateParcelBlockStatus);
exports.parcelRoutes = router;
