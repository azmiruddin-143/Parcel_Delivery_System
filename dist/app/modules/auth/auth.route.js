"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.credentialsLogin);
// router.post("/refresh-token", AuthController.createNewToken)
router.post("/logout", auth_controller_1.AuthController.userLogout);
router.post("/reset-password", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.IUserRole)), auth_controller_1.AuthController.resetPassword);
// router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
//     const redirect = req.query.redirect || "/"
//     passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
// })
// router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthController.googleCallbackController)
exports.authRoutes = router;
