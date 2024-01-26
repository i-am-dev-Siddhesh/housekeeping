"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cattleCategoryDeleteValidation = exports.cattleCategoryUpdateValidation = exports.cattleCategoryCreateValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cattleCategoryCreateValidation = joi_1.default.object().keys({
    category: joi_1.default.string().required().messages({
        "string.base": `Category should be a type of string`,
        "string.empty": `Category cannot be an empty field`,
        "any.required": `Category is a required field`,
    }),
});
exports.cattleCategoryUpdateValidation = joi_1.default.object().keys({
    category: joi_1.default.string().required().messages({
        "string.base": `Category should be a type of string`,
        "string.empty": `Category cannot be an empty field`,
        "any.required": `Category is a required field`,
    }),
    id: joi_1.default.number().required().messages({
        "number.base": `Id should be a type of string`,
        "number.empty": `Id cannot be an empty field`,
        "any.required": `Id is a required field`,
    }),
});
exports.cattleCategoryDeleteValidation = joi_1.default.object().keys({
    id: joi_1.default.number().required().messages({
        "number.base": `Id should be a type of string`,
        "number.empty": `Id cannot be an empty field`,
        "any.required": `Id is a required field`,
    }),
});
