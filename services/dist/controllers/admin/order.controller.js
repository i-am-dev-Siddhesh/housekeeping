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
exports.findOrdersForAdmin = exports.findOrderForAdmin = exports.updateOrderAdmin = exports.createOrderAdmin = void 0;
const prisma_1 = require("../../clients/prisma");
const errorResponse_1 = require("../../utils/errorResponse");
const order_1 = require("../../utils/order");
// @desc    Create order from admin
// @route   POST /v1/admin/order/create
// @access  Protected
const createOrderAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { slots } = _a, data = __rest(_a, ["slots"]);
        const availableWorkers = yield (0, order_1.findAvailableWorkers)(slots);
        const randomIndex = Math.floor(Math.random() * availableWorkers.length);
        const chosenWorker = availableWorkers[randomIndex];
        const newOrder = yield prisma_1.prisma.order.create({
            data: Object.assign(Object.assign({}, data), { slots: {
                    connect: chosenWorker.slots,
                } }),
        });
        return res.status(200).json({ status: true, data: newOrder });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.createOrderAdmin = createOrderAdmin;
// @desc    Update order from admin
// @route   PUT /v1/admin/order/update/:orderId
// @access  Protected
const updateOrderAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const _b = req.body, { slots } = _b, data = __rest(_b, ["slots"]);
        if (slots) {
            const availableWorkers = yield (0, order_1.findAvailableWorkers)(slots);
            const randomIndex = Math.floor(Math.random() * availableWorkers.length);
            const chosenWorker = availableWorkers[randomIndex];
            data.slots = {
                connect: chosenWorker.slots,
            };
        }
        const updatedOrder = yield prisma_1.prisma.order.update({
            data,
            where: {
                id: +orderId,
            },
        });
        return res.status(200).json({ status: true, data: updatedOrder });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.updateOrderAdmin = updateOrderAdmin;
// @desc    Find worker from admin
// @route   GET /v1/admin/order/:orderId
// @access  Protected
const findOrderForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield prisma_1.prisma.order.findUnique({
            where: {
                id: +orderId,
            },
            include: {
                customer: true,
                slots: true,
            },
        });
        if (!order) {
            throw {
                statusCode: 404,
                message: 'Order not found',
            };
        }
        return res.status(200).json({ status: true, data: order });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findOrderForAdmin = findOrderForAdmin;
// @desc    Find order from admin with pagination
// @route   GET /v1/admin/order/all
// @query   page (optional) - Page number (default: 1)
// @query   pageSize (optional) - Number of items per page (default: 10)
// @access  Protected
const findOrdersForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const skip = (page - 1) * pageSize;
        // Fetch Orders with pagination
        const Orders = yield prisma_1.prisma.order.findMany({
            skip,
            take: pageSize,
        });
        return res.status(200).json({ status: true, data: Orders });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.findOrdersForAdmin = findOrdersForAdmin;
