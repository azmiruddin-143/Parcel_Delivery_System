
import dotenv from "dotenv"
dotenv.config()
interface envconfig {
    PORT: string,
    DB_URL: string,
    JWT_ACCESS_SECRET:string
    BCRYPT_SALT_ROUND:string
    EXPRESS_SESSION_SECRET:string
    JWT_REFRESH_EXPIRES:string
}
const loadEnvailonment = (): envconfig => {
    const envarry: string[] =
        ["PORT",
            "DB_URL",
            "JWT_ACCESS_SECRET",
            "BCRYPT_SALT_ROUND",
            "EXPRESS_SESSION_SECRET",
            "JWT_REFRESH_EXPIRES"
        ]
    envarry.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Mising reqerment Enveronment ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string
         
      
    }
}

export const envVars: envconfig = loadEnvailonment()