import { ServiceRecord, ServiceStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IService } from "./serviceRecord.interface";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";

const createService = async (payload: IService) => {
  const result = await prisma.serviceRecord.create({
    data: {
      bikeId: payload.bikeId,
      serviceDate: payload.serviceDate,
      description: payload.description,
      status: payload.status,
    },
  });
  return result;
};

const getAllServices = async () => {
  const result = await prisma.serviceRecord.findMany({
    orderBy: {
      serviceDate: "asc",
    },
  });
  return result;
};

const getSingleService = async (id: string) => {
  //   checking existence
  const exists = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
    select: { serviceId: true },
  });

  if (!exists) {
    throw new AppError("Service not found", StatusCodes.NOT_FOUND);
  }

  //   final fetch
  const result = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });
  return result;
};

const updateService = async (id: string, payload: Partial<ServiceRecord>) => {
  //   checking existence
  const exists = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
    select: { serviceId: true },
  });

  if (!exists) {
    throw new AppError("Service not found", StatusCodes.NOT_FOUND);
  }

  // Default to now if no custom completionDate provided
  const completionDate = payload.completionDate ?? new Date();

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: {
      status: ServiceStatus.done,
      completionDate,
    },
  });
  return result;
};

const getPendingOrOverdueService = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const result = await prisma.serviceRecord.findMany({
    where: {
      status: {
        in: [ServiceStatus.pending, ServiceStatus.in_progress],
      },
      serviceDate: {
        lt: sevenDaysAgo,
      },
    },
  });
  return result;
};

export const ServiceRecordService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  getPendingOrOverdueService,
};
