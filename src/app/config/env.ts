
import dotenv from "dotenv"
dotenv.config()
interface envconfig {
    PORT: string,
    DB_URL: string,
}
const loadEnvailonment = (): envconfig => {
    const envarry: string[] =
        ["PORT",
            "DB_URL",
        ]
    envarry.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Mising reqerment Enveronment ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
      
    }
}

export const envVars: envconfig = loadEnvailonment()