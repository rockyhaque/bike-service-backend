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
exports.CustomerService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if email already exists
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            email: payload.email,
        },
        select: { email: true },
    });
    if (exists) {
        throw new AppError_1.AppError("Email already exists", http_status_codes_1.StatusCodes.CONFLICT);
    }
    const result = yield prisma_1.default.customer.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });
    return result;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const getSingleCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //   checking existence
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id,
        },
        select: { customerId: true },
    });
    if (!exists) {
        throw new AppError_1.AppError("Customer not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    //   final fetch
    const result = yield prisma_1.default.customer.findUniqueOrThrow({
        where: {
            customerId: id,
        },
    });
    return result;
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   checking existence
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id,
        },
        select: { customerId: true },
    });
    if (!exists) {
        throw new AppError_1.AppError("Customer not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    //   update
    const result = yield prisma_1.default.customer.update({
        where: {
            customerId: id,
        },
        data: payload,
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //   checking existence
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id,
        },
        select: { customerId: true },
    });
    if (!exists) {
        throw new AppError_1.AppError("Customer not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    //   delete
    const result = yield prisma_1.default.customer.delete({
        where: {
            customerId: id,
        },
    });
    return result;
});
exports.CustomerService = {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
