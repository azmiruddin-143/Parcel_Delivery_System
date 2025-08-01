"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const express_session_1 = __importDefault(require("express-session"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const env_1 = require("./app/config/env");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
// google// auth
app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', routes_1.router);
app.get('/', (req, res) => {
    res.send("Welcome to Parcel Delivery System");
});
app.use(notFound_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
