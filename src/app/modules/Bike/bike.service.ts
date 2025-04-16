import { StatusCodes } from "http-status-codes";
import prisma from "../../../shared/prisma";
import { IBike } from "./bike.interface";
import { AppError } from "../../utils/AppError";

const createBike = async (payload: IBike) => {
  const result = await prisma.bike.create({
    data: {
      brand: payload.brand,
      model: payload.model,
      year: payload.year,
      customerId: payload.customerId,
    },
  });
  return result;
};

const getAllBikes = async () => {
  const result = await prisma.bike.findMany({
    orderBy: {
      year: "desc",
    },
  });
  return result;
};

const getSingleBike = async (id: string) => {
  //   checking existence
  const exists = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
    select: { bikeId: true },
  });

  if (!exists) {
    throw new AppError("Bike not found", StatusCodes.NOT_FOUND);
  }

  //   final fetch
  const result = await prisma.bike.findUniqueOrThrow({
    where: {
      bikeId: id,
    },
  });
  return result;
};

export const BikeService = {
  createBike,
  getAllBikes,
  getSingleBike
};
