import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.createBike(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikes();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bikes fetched successfully",
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await BikeService.getSingleBike(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bike fetched successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike
};
