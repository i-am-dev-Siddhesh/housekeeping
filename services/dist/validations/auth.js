"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reciveOtpSchema = exports.userUpdateSchema = exports.userOnboardSchema = exports.loginSchema = exports.adminLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.adminLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().messages({
        'string.base': `Email should be a type of string`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
    }),
    password: joi_1.default.string().required().messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
    }),
});
exports.loginSchema = joi_1.default.object().keys({
    phone_number: joi_1.default.string().required().messages({
        'string.base': `Phone number should be a type of string`,
        'string.empty': `Phone number cannot be an empty field`,
        'any.required': `Phone number is a required field`,
    }),
    otp: joi_1.default.number().required().messages({
        'number.base': `OTP should be a type of number`,
        'any.required': `OTP is a required field`,
    }),
});
exports.userOnboardSchema = joi_1.default.object().keys({
    name: joi_1.default.string().max(100).messages({
        'string.base': `Name should be a type of string`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`,
        'string.max': `Name can have a maximum length of {#limit}`,
    }),
    phone_number: joi_1.default.string().required().messages({
        'string.base': `Phone number should be a type of string`,
        'string.empty': `Phone number cannot be an empty field`,
        'any.required': `Phone number is a required field`,
    }),
    otp: joi_1.default.string().length(6).pattern(/^\d+$/).required().messages({
        'string.base': `OTP should be a type of string`,
        'string.empty': `OTP cannot be an empty field`,
        'string.length': `OTP should be exactly 6 characters long`,
        'string.pattern.base': `OTP should contain only digits`,
        'any.required': `OTP is a required field`,
    }),
});
exports.userUpdateSchema = joi_1.default.object().keys({
    name: joi_1.default.string().max(100).messages({
        'string.base': `Name should be a type of string`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`,
        'string.max': `Name can have a maximum length of {#limit}`,
    }),
    language: joi_1.default.string().max(100).messages({
        'string.base': `Language should be a type of string`,
        'string.empty': `Language cannot be an empty field`,
        'any.required': `Language is a required field`,
        'string.max': `Language can have a maximum length of {#limit}`,
    }),
    location: joi_1.default.object().keys({
        latitude: joi_1.default.number().required().messages({
            'number.base': `Latitude should be a type of number`,
            'number.empty': `Latitude cannot be an empty field`,
            'any.required': `Latitude is a required field`,
        }),
        longitude: joi_1.default.number().required().messages({
            'number.base': `Longitude should be a type of number`,
            'number.empty': `Longitude cannot be an empty field`,
            'any.required': `Longitude is a required field`,
        }),
        postal_code: joi_1.default.number().messages({
            'number.base': `Postal code should be a type of number`,
            'number.empty': `Postal code cannot be an empty field`,
            'any.required': `Postal code is a required field`,
            'number.max': `Postal code can have a maximum length of {#limit}`,
        }),
        label: joi_1.default.string().max(100).messages({
            'string.base': `Label should be a type of string`,
            'string.empty': `Label cannot be an empty field`,
            'any.required': `Label is a required field`,
            'string.max': `Label can have a maximum length of {#limit}`,
        }),
        place: joi_1.default.string().messages({
            'string.base': `Place should be a type of string`,
            'string.empty': `Place cannot be an empty field`,
            'any.required': `Place is a required field`,
            'string.max': `Place can have a maximum length of {#limit}`,
        }),
        state: joi_1.default.string().messages({
            'string.base': `State should be a type of string`,
            'string.empty': `State cannot be an empty field`,
            'any.required': `State is a required field`,
            'string.max': `State can have a maximum length of {#limit}`,
        }),
        country: joi_1.default.string().messages({
            'string.base': `Country should be a type of string`,
            'string.empty': `Country cannot be an empty field`,
            'any.required': `Country is a required field`,
            'string.max': `Country can have a maximum length of {#limit}`,
        }),
    }),
});
exports.reciveOtpSchema = joi_1.default.object().keys({
    phone_number: joi_1.default.string().alphanum().length(10).required(),
});
