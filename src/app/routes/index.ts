import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { authRoutes } from "../modules/auth/auth.route"
import { parcelRoutes } from "../modules/parcel/parcel.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },

    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/parcels",
        route: parcelRoutes
    },

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

