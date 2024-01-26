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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWorkersForAdmin = exports.findWorkerForAdmin = exports.createWorkerAdmin = void 0;
const prisma_1 = require("../../clients/prisma");
const utils_1 = require("../../utils");
const errorResponse_1 = require("../../utils/errorResponse");
// @desc    Create worker from admin
// @route   POST /v1/admin/worker/create
// @access  Protected
const createWorkerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, kycVerified, availableFrom, location, minimumRequiredMonthlyIncome, leavesTaken, } = req.body;
        let profileUrl = '';
        if (req.file) {
            console.log('req.file,req.file', req.file);
            // const result = await uploadToS3(req.file);
            // profileUrl = result.Location;
        }
        const newWorker = yield prisma_1.prisma.worker.create({
            data: {
                name,
                email,
                phoneNumber,
                kycVerified,
                availableFrom,
                location,
                minimumRequiredMonthlyIncome,
                leavesTaken,
                profileUrl,
                slots: {
                    createMany: {
                        data: (0, utils_1.generateDefaultSlots)(),
                    },
                },
            },
            include: {
                slots: true,
            },
        });
        return res.status(200).json({ status: true, data: newWorker });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.createWorkerAdmin = createWorkerAdmin;
// @desc    Find worker from admin
// @route   GET /v1/admin/worker/:phoneNumber
// @access  Protected
const findWorkerForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phoneNumber = req.params.phoneNumber;
        // Fetch worker data by phone number
        const worker = yield prisma_1.prisma.worker.findUnique({
            where: {
                phoneNumber,
            },
            include: {
                slots: true,
                orders: true,
                // Include other related data as needed
            },
        });
        if (!worker) {
            throw {
                statusCode: 404,
                message: 'Worker not found',
            };
        }
        return res.status(200).json({ status: true, data: worker });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findWorkerForAdmin = findWorkerForAdmin;
// @desc    Find worker from admin with pagination
// @route   GET /v1/admin/worker/
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
const findWorkersForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const skip = (page - 1) * pageSize;
        // Fetch workers with pagination
        const workers = yield prisma_1.prisma.worker.findMany({
            skip,
            take: pageSize,
        });
        return res.status(200).json({ status: true, data: workers });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findWorkersForAdmin = findWorkersForAdmin;
