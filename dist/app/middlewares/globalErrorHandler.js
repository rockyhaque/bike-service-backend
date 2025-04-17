"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json(Object.assign({ success: false, status: statusCode, message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!" }, (process.env.NODE_ENV === "development" && { stack: error === null || error === void 0 ? void 0 : error.stack })));
};
exports.default = globalErrorHandler;
