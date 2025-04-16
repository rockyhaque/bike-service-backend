import express from "express";
import { customerRoutes } from "../modules/Customer/customer.routes";
import { bikeRoutes } from "../modules/Bike/bike.routes";
import { serviceRoutes } from "../modules/ServiceRecord/serviceRecord.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/customers",
    route: customerRoutes,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
