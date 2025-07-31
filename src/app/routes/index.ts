import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { authRoutes } from "../modules/auth/auth.route"
import { parcelRoutes } from "../modules/parcel/parcel.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },

    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/parcel",
        route: parcelRoutes
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)