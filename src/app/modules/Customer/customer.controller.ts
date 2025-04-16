import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CustomerService } from "./customer.service";

const createCustomer = catchAsync(async (req, res) => {
  const result = await CustomerService.createCustomer(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerService.getAllCustomers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.getSingleCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer fetched successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.updateCustomer(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CustomerService.deleteCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer deleted successfully"
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer
};
