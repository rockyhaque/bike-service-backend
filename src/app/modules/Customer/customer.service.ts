import { Customer } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICustomer } from "./customer.interface";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";

const createCustomer = async (payload: ICustomer) => {
  const result = await prisma.customer.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  });
  return result;
};

const getAllCustomers = async () => {
  const result = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getSingleCustomer = async (id: string) => {
  //   checking existence
  const exists = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
    select: { customerId: true },
  });

  if (!exists) {
    throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
  }

  //   final fetch
  const result = await prisma.customer.findUniqueOrThrow({
    where: {
      customerId: id,
    },
  });
  return result;
};

const updateCustomer = async (id: string, payload: Partial<Customer>) => {
  //   checking existence
  const exists = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
    select: { customerId: true },
  });

  if (!exists) {
    throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
  }

  //   update
  const result = await prisma.customer.update({
    where: {
      customerId: id,
    },
    data: payload,
  });
  return result;
};

const deleteCustomer = async (id: string) => {
  //   checking existence
  const exists = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
    select: { customerId: true },
  });

  if (!exists) {
    throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
  }

  //   delete
  const result = await prisma.customer.delete({
    where: {
      customerId: id,
    },
  });
  return result;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
