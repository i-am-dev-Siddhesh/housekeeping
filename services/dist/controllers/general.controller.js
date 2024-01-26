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
exports.checkHash = exports.checkAppVersion = exports.checkServerHealth = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const constants_1 = require("../constants");
const prisma_1 = require("../clients/prisma");
// @desc    Check Server Health
// @route   GET /v1/
// @access  Public
const checkServerHealth = (_req, res) => {
    try {
        return res
            .status(200)
            .json({ status: true, message: constants_1.SERVER_RUNNING_MESSAGE });
    }
    catch (error) {
        return res.status(500).json((0, errorResponse_1.generalError)(error));
    }
};
exports.checkServerHealth = checkServerHealth;
// @desc    Check Play store app version
// @route   GET /v1/app-version
// @access  Public
const checkAppVersion = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const common = yield prisma_1.prisma.common.findFirst();
        return res.status(200).json({
            status: true,
            data: {
                play_store_app_version: common === null || common === void 0 ? void 0 : common.play_store_app_version,
                ios_store_app_version: '',
            },
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.checkAppVersion = checkAppVersion;
// @desc    Check Hash version
// @route   POST /v1/hash version
// @access  Public
const checkHash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('req. body hash', req === null || req === void 0 ? void 0 : req.body);
        console.log('req. query params', (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.params);
        console.log('req. query hash', req === null || req === void 0 ? void 0 : req.query);
        return res.status(200).json({
            status: true,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.checkHash = checkHash;
