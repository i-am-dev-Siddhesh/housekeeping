"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object().keys({
    customerPhoneNumber: joi_1.default.number().required().messages({
        'string.base': 'Customer Phone Number should be a type of string',
        'string.empty': 'Customer Phone Number cannot be an empty field',
        'any.required': 'Customer Phone Number is a required field',
    }),
    budget: joi_1.default.number().required().messages({
        'string.base': 'Budget should be a type of string',
        'string.empty': 'Budget cannot be an empty field',
        'any.required': 'Budget is a required field',
    }),
    phoneNumber: joi_1.default.number().required().messages({
        'number.base': 'Phone number should be a type of number',
        'number.empty': 'Phone number cannot be an empty field',
        'any.required': 'Phone number is a required field',
    }),
    expectedStartDate: joi_1.default.date().required().messages({
        'date.base': 'Expected start date should be a valid date',
        'any.required': 'Expected start date from is a required field',
    }),
    actualStartDate: joi_1.default.date().required().messages({
        'date.base': 'Actual start date should be a valid date',
        'any.required': 'Actual start date from is a required field',
    }),
    location: joi_1.default.object().keys({
        lat: joi_1.default.number().messages({
            'string.base': `Latitude should be a type of string`,
            'string.empty': `Latitude cannot be an empty field`,
            'any.required': `Latitude is a required field`,
        }),
        lon: joi_1.default.number().messages({
            'string.base': `Longitude should be a type of string`,
            'string.empty': `Longitude cannot be an empty field`,
            'any.required': `Longitude is a required field`,
        }),
        label: joi_1.default.string().required().messages({
            'string.base': 'Label should be a type of string',
            'string.empty': 'Label cannot be an empty field',
        }),
    }),
    status: joi_1.default.string()
        .valid('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
        .required()
        .messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status is required',
        'any.required': 'Status is required',
        'any.only': 'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED',
    }),
    slots: joi_1.default.array()
        .items(joi_1.default.number().integer().min(1).max(16))
        .required()
        .messages({
        'array.base': 'Slots must be an array',
        'array.empty': 'Slotss is required',
        'any.required': 'Slots is required',
        'array.includes': 'Invalid slots. Each element must be a number between 1 and 16',
    }),
});
exports.updateOrderSchema = joi_1.default.object().keys({
    customerId: joi_1.default.number().messages({
        'string.base': 'Customer id should be a type of string',
        'string.empty': 'Customer id cannot be an empty field',
    }),
    budget: joi_1.default.number().optional().messages({
        'number.base': 'Budget should be a type of number',
        'any.required': 'Budget is a required field',
    }),
    phoneNumber: joi_1.default.number().optional().messages({
        'number.base': 'Phone number should be a type of number',
        'any.required': 'Phone number is a required field',
    }),
    expectedStartDate: joi_1.default.date().optional().messages({
        'date.base': 'Expected start date should be a valid date',
        'any.required': 'Expected start date is a required field',
    }),
    actualStartDate: joi_1.default.date().optional().messages({
        'date.base': 'Actual start date should be a valid date',
        'any.required': 'Actual start date is a required field',
    }),
    location: joi_1.default.object().keys({
        lat: joi_1.default.number().optional().messages({
            'number.base': 'Latitude should be a type of number',
            'any.required': 'Latitude is a required field',
        }),
        lon: joi_1.default.number().optional().messages({
            'number.base': 'Longitude should be a type of number',
            'any.required': 'Longitude is a required field',
        }),
        label: joi_1.default.string().optional().messages({
            'string.base': 'Label should be a type of string',
            'any.required': 'Label is a required field',
        }),
    }),
    status: joi_1.default.string()
        .valid('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
        .optional()
        .messages({
        'string.base': 'Status must be a string',
        'any.only': 'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED',
    }),
    slots: joi_1.default.array()
        .items(joi_1.default.number().integer().min(1).max(16))
        .optional()
        .messages({
        'array.base': 'Slots must be an array',
        'array.includes': 'Invalid slots. Each element must be a number between 1 and 16',
    }),
});
