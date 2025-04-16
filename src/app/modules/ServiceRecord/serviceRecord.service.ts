import { ServiceRecord, ServiceStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IService } from "./serviceRecord.interface";

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
    throw new Error(`Service with ID ${id} does not exist.`);
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
    throw new Error(`Service with ID ${id} does not exist.`);
  }

  //   update
  const result = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: {
      status: ServiceStatus.done,
      ...payload,
    },
  });
  return result;
};

export const ServiceRecordService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
};
