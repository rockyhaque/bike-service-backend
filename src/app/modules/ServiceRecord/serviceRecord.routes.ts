import express from "express";
import { ServiceRecordController } from "./serviceRecord.controller";

const router = express.Router();

router.post("/", ServiceRecordController.createService);
router.get("/", ServiceRecordController.getAllServices);
router.get("/:id", ServiceRecordController.getSingleService);

export const serviceRoutes = router;
