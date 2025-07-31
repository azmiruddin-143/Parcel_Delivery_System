

import cors from "cors"
import express, { Request, Response } from "express"
import { router } from "./app/routes"
import expressSession from "express-session"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler"
import { envVars } from "./app/config/env"
import notFound from "./app/middlewares/notFound";
const app = express()

// google// auth
app.use(expressSession({
    secret:envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(cors())
app.use('/api/v1',router)

app.get('/', (req: Request, res: Response) => {
   res.send("Welcome to Parcel Delivery System")
})


app.use(notFound)
app.use(globalErrorHandler)



export default app