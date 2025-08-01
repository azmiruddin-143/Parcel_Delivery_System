
import { AuthController } from "./auth.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { IUserRole } from "../user/user.interface"
import { Router } from "express"


const router = Router()
// Auth Route//
router.post("/login", AuthController.credentialsLogin)
router.post("/logout", AuthController.userLogout)
router.post("/reset-password",checkAuth(...Object.values(IUserRole)) , AuthController.resetPassword)


export const authRoutes = router