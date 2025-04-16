import prisma from "../../../shared/prisma";
import { IBike } from "./bike.interface";

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
    throw new Error(`Bike with ID ${id} does not exist.`);
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
