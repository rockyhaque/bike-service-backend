import express, { NextFunction, Application, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser"
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import { customerRoutes } from "./app/modules/Customer/customer.routes";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(cookieParser())

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Bike Service Server...",
  });
});

app.use("/api", router);

// Global Error Handler
app.use(globalErrorHandler)

// Not Found
app.use(notFoundHandler)

export default app;