"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createWorkerSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name cannot be an empty field',
        'any.required': 'Name is a required field',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email should be a valid email address',
        'any.required': 'Email is a required field',
    }),
    phoneNumber: joi_1.default.string().required().messages({
        'string.base': 'Phone number should be a type of string',
        'string.empty': 'Phone number cannot be an empty field',
        'any.required': 'Phone number is a required field',
    }),
    kycVerified: joi_1.default.boolean().default(false).messages({
        'boolean.base': 'KYC verification should be a type of boolean',
    }),
    availableFrom: joi_1.default.date().required().messages({
        'date.base': 'Available from should be a valid date',
        'any.required': 'Available from is a required field',
    }),
    location: joi_1.default.object().keys({
        latitude: joi_1.default.number().messages({
            'string.base': `Latitude should be a type of string`,
            'string.empty': `Latitude cannot be an empty field`,
            'any.required': `Latitude is a required field`,
        }),
        longitude: joi_1.default.number().messages({
            'string.base': `Longitude should be a type of string`,
            'string.empty': `Longitude cannot be an empty field`,
            'any.required': `Longitude is a required field`,
        }),
    }),
    minimumRequiredMonthlyIncome: joi_1.default.number().messages({
        'number.base': 'Minimum required monthly income should be a type of number',
    }),
    leavesTaken: joi_1.default.number().default(0).messages({
        'number.base': 'Leaves taken should be a type of number',
    }),
    profileUrl: joi_1.default.string().messages({
        'string.base': 'Profile URL should be a type of string',
    }),
});
