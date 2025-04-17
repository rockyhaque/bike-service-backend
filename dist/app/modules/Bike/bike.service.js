"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = require("../../utils/AppError");
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.create({
        data: {
            brand: payload.brand,
            model: payload.model,
            year: payload.year,
            customerId: payload.customerId,
        },
    });
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findMany({
        orderBy: {
            year: "desc",
        },
    });
    return result;
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //   checking existence
    const exists = yield prisma_1.default.bike.findUnique({
        where: {
            bikeId: id,
        },
        select: { bikeId: true },
    });
    if (!exists) {
        throw new AppError_1.AppError("Bike not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    //   final fetch
    const result = yield prisma_1.default.bike.findUniqueOrThrow({
        where: {
            bikeId: id,
        },
    });
    return result;
});
exports.BikeService = {
    createBike,
    getAllBikes,
    getSingleBike
};
