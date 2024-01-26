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
exports.adminLoginApi = exports.adminMeApi = void 0;
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("../../clients/prisma");
const messages_1 = require("../../constants/messages");
const auth_1 = require("../../utils/auth");
const errorResponse_1 = require("../../utils/errorResponse");
// @desc    GET Admin
// @route   GET /v1/auth/admin/me
// @access  Protected
const adminMeApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.admin && req.admin.password) {
            // @ts-ignore
            delete req.admin.password;
        }
        return res.status(200).json({ status: true, data: req.admin });
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.adminMeApi = adminMeApi;
// @desc    login admin
// @route   POST /v1/auth/admin/login
// @access  Public
const adminLoginApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let admin = yield prisma_1.prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            throw {
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const isValid = yield argon2_1.default.verify(admin === null || admin === void 0 ? void 0 : admin.password, password);
        if (!isValid) {
            throw {
                status_code: 404,
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const token = (0, auth_1.createJWTToken)({
            id: admin.id,
            email: admin === null || admin === void 0 ? void 0 : admin.email,
        }, 'admin');
        res.cookie('auth', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.DOMAIN,
        });
        delete admin.password;
        return res.status(200).json({ status: true, data: admin });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.adminLoginApi = adminLoginApi;
