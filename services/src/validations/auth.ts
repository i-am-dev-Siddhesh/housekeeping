import Joi from 'joi';

export const adminLoginSchema = Joi.object().keys({
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of string`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
  }),
});

export const loginSchema = Joi.object().keys({
  phone_number: Joi.string().required().messages({
    'string.base': `Phone number should be a type of string`,
    'string.empty': `Phone number cannot be an empty field`,
    'any.required': `Phone number is a required field`,
  }),
  otp: Joi.number().required().messages({
    'number.base': `OTP should be a type of number`,
    'any.required': `OTP is a required field`,
  }),
});

export const userOnboardSchema = Joi.object().keys({
  name: Joi.string().max(100).messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`,
    'string.max': `Name can have a maximum length of {#limit}`,
  }),
  phone_number: Joi.string().required().messages({
    'string.base': `Phone number should be a type of string`,
    'string.empty': `Phone number cannot be an empty field`,
    'any.required': `Phone number is a required field`,
  }),
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    'string.base': `OTP should be a type of string`,
    'string.empty': `OTP cannot be an empty field`,
    'string.length': `OTP should be exactly 6 characters long`,
    'string.pattern.base': `OTP should contain only digits`,
    'any.required': `OTP is a required field`,
  }),
});

export const userUpdateSchema = Joi.object().keys({
  name: Joi.string().max(100).messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`,
    'string.max': `Name can have a maximum length of {#limit}`,
  }),
  language: Joi.string().max(100).messages({
    'string.base': `Language should be a type of string`,
    'string.empty': `Language cannot be an empty field`,
    'any.required': `Language is a required field`,
    'string.max': `Language can have a maximum length of {#limit}`,
  }),
  location: Joi.object().keys({
    latitude: Joi.number().required().messages({
      'number.base': `Latitude should be a type of number`,
      'number.empty': `Latitude cannot be an empty field`,
      'any.required': `Latitude is a required field`,
    }),
    longitude: Joi.number().required().messages({
      'number.base': `Longitude should be a type of number`,
      'number.empty': `Longitude cannot be an empty field`,
      'any.required': `Longitude is a required field`,
    }),
    postal_code: Joi.number().messages({
      'number.base': `Postal code should be a type of number`,
      'number.empty': `Postal code cannot be an empty field`,
      'any.required': `Postal code is a required field`,
      'number.max': `Postal code can have a maximum length of {#limit}`,
    }),
    label: Joi.string().max(100).messages({
      'string.base': `Label should be a type of string`,
      'string.empty': `Label cannot be an empty field`,
      'any.required': `Label is a required field`,
      'string.max': `Label can have a maximum length of {#limit}`,
    }),
    place: Joi.string().messages({
      'string.base': `Place should be a type of string`,
      'string.empty': `Place cannot be an empty field`,
      'any.required': `Place is a required field`,
      'string.max': `Place can have a maximum length of {#limit}`,
    }),
    state: Joi.string().messages({
      'string.base': `State should be a type of string`,
      'string.empty': `State cannot be an empty field`,
      'any.required': `State is a required field`,
      'string.max': `State can have a maximum length of {#limit}`,
    }),
    country: Joi.string().messages({
      'string.base': `Country should be a type of string`,
      'string.empty': `Country cannot be an empty field`,
      'any.required': `Country is a required field`,
      'string.max': `Country can have a maximum length of {#limit}`,
    }),
  }),
});

export const reciveOtpSchema = Joi.object().keys({
  phone_number: Joi.string().alphanum().length(10).required(),
});
