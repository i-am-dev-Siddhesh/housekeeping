import Joi from "joi";

export const cattleCategoryCreateValidation = Joi.object().keys({
  category: Joi.string().required().messages({
    "string.base": `Category should be a type of string`,
    "string.empty": `Category cannot be an empty field`,
    "any.required": `Category is a required field`,
  }),
});

export const cattleCategoryUpdateValidation = Joi.object().keys({
  category: Joi.string().required().messages({
    "string.base": `Category should be a type of string`,
    "string.empty": `Category cannot be an empty field`,
    "any.required": `Category is a required field`,
  }),
  id: Joi.number().required().messages({
    "number.base": `Id should be a type of string`,
    "number.empty": `Id cannot be an empty field`,
    "any.required": `Id is a required field`,
  }),
});

export const cattleCategoryDeleteValidation = Joi.object().keys({
  id: Joi.number().required().messages({
    "number.base": `Id should be a type of string`,
    "number.empty": `Id cannot be an empty field`,
    "any.required": `Id is a required field`,
  }),
});
