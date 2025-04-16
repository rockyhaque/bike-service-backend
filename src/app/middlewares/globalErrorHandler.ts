import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: error?.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: error?.stack }),
    // error: error,
  });
};

export default globalErrorHandler;
