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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCustomersForAdmin = exports.findCustomerForAdmin = exports.updateCustomerAdmin = exports.createCustomerAdmin = exports.findWorkersForAdmin = exports.findWorkerForAdmin = exports.updateWorkerAdmin = exports.createWorkerAdmin = void 0;
const prisma_1 = require("../../clients/prisma");
const utils_1 = require("../../utils");
const errorResponse_1 = require("../../utils/errorResponse");
// @desc    Create worker from admin
// @route   POST /v1/admin/worker/create
// @access  Protected
const createWorkerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.admin;
        const { name, phoneNumber, kycVerified, availableFrom, location, minimumRequiredMonthlyIncome, leavesTaken, } = req.body;
        let profileUrl = '';
        if (req.files) {
            //@ts-ignore
            const profileFiles = req.files.profile || [];
            if (profileFiles.length > 0) {
                console.log('profileFiles', profileFiles);
            }
            //@ts-ignore
            const aadhaarFiles = req.files.aadhaar || [];
            if (aadhaarFiles.length > 0) {
                console.log('aadhaarFiles', aadhaarFiles);
            }
            // const result = await uploadToS3(req.file);
            // profileUrl = result.Location;
        }
        const newWorker = yield prisma_1.prisma.worker.create({
            data: {
                name,
                phoneNumber: String(phoneNumber),
                kycVerified,
                availableFrom: new Date(availableFrom),
                location,
                minimumRequiredMonthlyIncome,
                leavesTaken,
                profileUrl,
                addedById: admin.id,
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
// @desc    Update worker from admin
// @route   PUT /v1/admin/worker/update/:workerId
// @access  Protected
const updateWorkerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.admin;
        const { workerId } = req.params;
        let _a = req.body, { phoneNumber, reason } = _a, rest = __rest(_a, ["phoneNumber", "reason"]);
        if (phoneNumber) {
            phoneNumber = String(phoneNumber);
            rest = Object.assign(Object.assign({}, rest), { phoneNumber });
        }
        if (req.files) {
            //@ts-ignore
            const profileFiles = req.files.profile || [];
            if (profileFiles.length > 0) {
                console.log('profileFiles', profileFiles);
                // Handle file upload and update profileUrl accordingly
            }
            //@ts-ignore
            const aadhaarFiles = req.files.aadhaar || [];
            if (aadhaarFiles.length > 0) {
                console.log('aadhaarFiles', aadhaarFiles);
                // Handle file upload for Aadhaar and update accordingly
            }
        }
        // Create a new worker updation history
        const workerUpdation = yield prisma_1.prisma.workerUpdationHistory.create({
            data: {
                reason,
                admin: {
                    connect: {
                        id: admin.id,
                    },
                },
                worker: {
                    connect: {
                        id: +workerId,
                    },
                },
            },
        });
        const updatedWorker = yield prisma_1.prisma.worker.update({
            where: {
                id: +workerId,
            },
            data: Object.assign({ updations: {
                    connect: {
                        id: workerUpdation.id,
                    },
                } }, rest),
            include: {
                slots: true,
            },
        });
        return res.status(200).json({ status: true, data: updatedWorker });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.updateWorkerAdmin = updateWorkerAdmin;
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
                updations: true,
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
// @route   GET /v1/admin/worker/all
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
// @desc    Create customer from admin
// @route   POST /v1/admin/customer/create
// @access  Protected
const createCustomerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, phoneNumber, email, location, password } = req.body;
        password = yield (0, utils_1.hashString)(password);
        let profileUrl = '';
        if (req.files) {
            //@ts-ignore
            const profileFiles = req.files.profile || [];
            if (profileFiles.length > 0) {
                console.log('profileFiles', profileFiles);
            }
        }
        const newCustomer = yield prisma_1.prisma.customer.create({
            data: {
                name,
                password,
                email,
                phoneNumber: String(phoneNumber),
                location,
                profileUrl,
            },
        });
        return res.status(200).json({ status: true, data: newCustomer });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.createCustomerAdmin = createCustomerAdmin;
// @desc    Update customer from admin
// @route   PUT /v1/admin/customer/update/:customerId
// @access  Protected
const updateCustomerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        let _b = req.body, { phoneNumber, password } = _b, rest = __rest(_b, ["phoneNumber", "password"]);
        if (phoneNumber) {
            phoneNumber = String(phoneNumber);
            rest = Object.assign(Object.assign({}, rest), { phoneNumber });
        }
        if (password) {
            password = yield (0, utils_1.hashString)(password);
            rest = Object.assign(Object.assign({}, rest), { password });
        }
        if (req.files) {
            //@ts-ignore
            const profileFiles = req.files.profile || [];
            if (profileFiles.length > 0) {
                console.log('profileFiles', profileFiles);
                // Handle file upload and update profileUrl accordingly
            }
        }
        const updatedCustomer = yield prisma_1.prisma.customer.update({
            where: {
                id: +customerId,
            },
            data: Object.assign({}, rest),
        });
        return res.status(200).json({ status: true, data: updatedCustomer });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.updateCustomerAdmin = updateCustomerAdmin;
// @desc    Find worker from admin
// @route   GET /v1/admin/customer/:customerId
// @access  Protected
const findCustomerForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.customerId;
        // Fetch worker data by phone number
        const customer = yield prisma_1.prisma.customer.findUnique({
            where: {
                id: +customerId,
            },
            include: {
                orders: true,
            },
        });
        if (!customer) {
            throw {
                statusCode: 404,
                message: 'Customer not found',
            };
        }
        return res.status(200).json({ status: true, data: customer });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findCustomerForAdmin = findCustomerForAdmin;
// @desc    Find customer from admin with pagination
// @route   GET /v1/admin/customer/all
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
const findCustomersForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const skip = (page - 1) * pageSize;
        // Fetch customers with pagination
        const customers = yield prisma_1.prisma.customer.findMany({
            skip,
            take: pageSize,
        });
        return res.status(200).json({ status: true, data: customers });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findCustomersForAdmin = findCustomersForAdmin;
