
import { AuthController } from "./auth.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { IUserRole } from "../user/user.interface"
import { Router } from "express"


const router = Router()
router.post("/login", AuthController.credentialsLogin)
// router.post("/refresh-token", AuthController.createNewToken)
router.post("/logout", AuthController.userLogout)
router.post("/reset-password",checkAuth(...Object.values(IUserRole)) , AuthController.resetPassword)


// router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
//     const redirect = req.query.redirect || "/"
//     passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
// })

// router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthController.googleCallbackController)

export const authRoutes = router