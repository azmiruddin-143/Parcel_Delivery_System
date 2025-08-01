import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
import { IUserRole } from "./user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createZodSchema } from "./user.validate";

const router = Router()

router.post("/register",validateRequest(createZodSchema), UserControllers.createUser)
router.get("/all-users", checkAuth(IUserRole.Admin), UserControllers.getAllUsers)
router.patch("/:id",validateRequest(createZodSchema),checkAuth(...Object.values(IUserRole)), UserControllers.updateUser)
router.get("/:id", UserControllers.getSingleUser)
router.patch('/:id/status',checkAuth(IUserRole.Admin),UserControllers.changeUserStatus
);
router.delete("/:id",checkAuth(IUserRole.Admin), UserControllers.deleteUser);
export const UserRoutes = router

