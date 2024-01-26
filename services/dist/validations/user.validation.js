"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserWishlistValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateUserWishlistValidation = joi_1.default.object().keys({
    cattleId: joi_1.default.number().required().messages({
        "number.base": `Cattle Id should be a type of string`,
        "number.empty": `Cattle Id cannot be an empty field`,
        "any.required": `Cattle Id is a required field`,
    }),
    action: joi_1.default.string().valid("remove", "add").required().messages({
        "string.base": `Cattle Id should be a type of string`,
        "string.empty": `Cattle Id cannot be an empty field`,
        "any.required": `Cattle Id is a required field`,
    }),
});
