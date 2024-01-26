import Joi from "joi";

export const updateUserWishlistValidation = Joi.object().keys({
  cattleId: Joi.number().required().messages({
    "number.base": `Cattle Id should be a type of string`,
    "number.empty": `Cattle Id cannot be an empty field`,
    "any.required": `Cattle Id is a required field`,
  }),

  action: Joi.string().valid("remove", "add").required().messages({
    "string.base": `Cattle Id should be a type of string`,
    "string.empty": `Cattle Id cannot be an empty field`,
    "any.required": `Cattle Id is a required field`,
  }),
});
