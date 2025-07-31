import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
import { IUserRole } from "./user.interface";

const router = Router()

router.post("/register", UserControllers.createUser)
router.get("/all-users", checkAuth(IUserRole.Admin), UserControllers.getAllUsers)
router.patch("/:id", UserControllers.updateUser)
router.get("/:id", UserControllers.getSingleUser)
router.delete("/:id", UserControllers.deleteUser);
// /api/v1/user/:id
export const UserRoutes = router


// checkAuth(...Object.values(IUserRole)),