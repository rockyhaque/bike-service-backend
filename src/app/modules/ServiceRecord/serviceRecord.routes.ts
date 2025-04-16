import express from "express";
import { ServiceRecordController } from "./serviceRecord.controller";

const router = express.Router();

router.post("/", ServiceRecordController.createService);
router.get("/", ServiceRecordController.getAllServices);
router.get("/:id", ServiceRecordController.getSingleService);
router.put("/:id/complete", ServiceRecordController.updateService);

export const serviceRoutes = router;
