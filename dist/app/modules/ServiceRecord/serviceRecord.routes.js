"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const serviceRecord_controller_1 = require("./serviceRecord.controller");
const router = express_1.default.Router();
router.get("/status", serviceRecord_controller_1.ServiceRecordController.getPendingOrOverdueService);
router.post("/", serviceRecord_controller_1.ServiceRecordController.createService);
router.get("/", serviceRecord_controller_1.ServiceRecordController.getAllServices);
router.get("/:id", serviceRecord_controller_1.ServiceRecordController.getSingleService);
router.put("/:id/complete", serviceRecord_controller_1.ServiceRecordController.updateService);
exports.serviceRoutes = router;
