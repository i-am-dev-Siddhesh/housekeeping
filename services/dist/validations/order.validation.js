"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSchema = exports.createCustomerSchema = exports.updateOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object().keys({
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
    minimumRequiredMonthlyIncome: joi_1.default.number().required().messages({
        'number.base': 'Minimum required monthly income should be a type of number',
    }),
    leavesTaken: joi_1.default.number().default(0).messages({
        'number.base': 'Leaves taken should be a type of number',
    }),
    profileUrl: joi_1.default.string().messages({
        'string.base': 'Profile URL should be a type of string',
    }),
});
exports.updateOrderSchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name cannot be an empty field',
    }),
    reason: joi_1.default.string().required().messages({
        'string.base': 'Reason should be a type of string',
        'string.empty': 'Reason cannot be an empty field',
        'any.required': `Reason is a required field`,
    }),
    phoneNumber: joi_1.default.number().messages({
        'number.base': 'Phone number should be a type of number',
        'number.empty': 'Phone number cannot be an empty field',
    }),
    kycVerified: joi_1.default.boolean().messages({
        'boolean.base': 'KYC verification should be a type of boolean',
    }),
    availableFrom: joi_1.default.date().messages({
        'date.base': 'Available from should be a valid date',
    }),
    location: joi_1.default.object().keys({
        lat: joi_1.default.number().messages({
            'number.base': 'Latitude should be a type of number',
        }),
        lon: joi_1.default.number().messages({
            'number.base': 'Longitude should be a type of number',
        }),
        label: joi_1.default.string().messages({
            'string.base': 'Label should be a type of string',
            'string.empty': 'Label cannot be an empty field',
        }),
    }),
    minimumRequiredMonthlyIncome: joi_1.default.number().messages({
        'number.base': 'Minimum required monthly income should be a type of number',
    }),
    leavesTaken: joi_1.default.number().messages({
        'number.base': 'Leaves taken should be a type of number',
    }),
    profileUrl: joi_1.default.string().messages({
        'string.base': 'Profile URL should be a type of string',
    }),
})
    .optional();
exports.createCustomerSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name cannot be an empty field',
        'any.required': 'Name is a required field',
    }),
    password: joi_1.default.string().required().messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
    }),
    email: joi_1.default.string().required().messages({
        'string.base': `Email should be a type of string`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
    }),
    phoneNumber: joi_1.default.number().required().messages({
        'number.base': 'Phone number should be a type of number',
        'number.empty': 'Phone number cannot be an empty field',
        'any.required': 'Phone number is a required field',
    }),
    location: joi_1.default.object()
        .keys({
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
            'any.required': `Longitude is a required field`,
        }),
    })
        .required(),
});
exports.updateCustomerSchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name cannot be an empty field',
    }),
    password: joi_1.default.string().required().messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
    }),
    email: joi_1.default.string().required().messages({
        'string.base': `Email should be a type of string`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
    }),
    phoneNumber: joi_1.default.number().messages({
        'number.base': 'Phone number should be a type of number',
        'number.empty': 'Phone number cannot be an empty field',
    }),
    location: joi_1.default.object().keys({
        lat: joi_1.default.number().messages({
            'number.base': 'Latitude should be a type of number',
        }),
        lon: joi_1.default.number().messages({
            'number.base': 'Longitude should be a type of number',
        }),
        label: joi_1.default.string().messages({
            'string.base': 'Label should be a type of string',
            'string.empty': 'Label cannot be an empty field',
        }),
    }),
})
    .optional();
