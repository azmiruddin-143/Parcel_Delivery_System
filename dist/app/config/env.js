"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvailonment = () => {
    const envarry = ["PORT",
        "DB_URL",
        "JWT_ACCESS_SECRET",
        "BCRYPT_SALT_ROUND",
        "EXPRESS_SESSION_SECRET",
        "JWT_REFRESH_EXPIRES"
    ];
    envarry.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Mising reqerment Enveronment ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES
    };
};
exports.envVars = loadEnvailonment();
