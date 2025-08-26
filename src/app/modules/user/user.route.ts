import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
import { IUserRole } from "./user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createZodSchema, updateZodSchema } from "./user.validate";

const router = Router()

router.post("/register",validateRequest(createZodSchema), UserControllers.createUser)
router.get("/search", checkAuth(IUserRole.Admin, IUserRole.Sender), UserControllers.searchUserByEmail);
router.get("/stats", checkAuth(IUserRole.Admin), UserControllers.getUserStats);
router.get("/allusers", checkAuth(IUserRole.Admin), UserControllers.getAllUsers)
router.get("/me", checkAuth(...Object.values(IUserRole)), UserControllers.getMe)
router.patch("/:id",validateRequest(updateZodSchema),checkAuth(...Object.values(IUserRole)), UserControllers.updateUser)
router.get("/:id", UserControllers.getSingleUser)
router.patch('/:id/status',checkAuth(IUserRole.Admin),UserControllers.changeUserStatus
);
router.delete("/:id",checkAuth(IUserRole.Admin), UserControllers.deleteUser);
export const UserRoutes = router

