import Joi from 'joi';

export const createOrderSchema = Joi.object().keys({
  budget: Joi.number().required().messages({
    'string.base': 'Budget should be a type of string',
    'string.empty': 'Budget cannot be an empty field',
    'any.required': 'Budget is a required field',
  }),
  phoneNumber: Joi.number().required().messages({
    'number.base': 'Phone number should be a type of number',
    'number.empty': 'Phone number cannot be an empty field',
    'any.required': 'Phone number is a required field',
  }),
  expectedStartDate: Joi.date().required().messages({
    'date.base': 'Expected start date should be a valid date',
    'any.required': 'Expected start date from is a required field',
  }),
  actualStartDate: Joi.date().required().messages({
    'date.base': 'Actual start date should be a valid date',
    'any.required': 'Actual start date from is a required field',
  }),
  location: Joi.object().keys({
    lat: Joi.number().messages({
      'string.base': `Latitude should be a type of string`,
      'string.empty': `Latitude cannot be an empty field`,
      'any.required': `Latitude is a required field`,
    }),
    lon: Joi.number().messages({
      'string.base': `Longitude should be a type of string`,
      'string.empty': `Longitude cannot be an empty field`,
      'any.required': `Longitude is a required field`,
    }),
    label: Joi.string().required().messages({
      'string.base': 'Label should be a type of string',
      'string.empty': 'Label cannot be an empty field',
    }),
  }),
  status: Joi.string()
    .valid('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
    .required()
    .messages({
      'string.base': 'Status must be a string',
      'string.empty': 'Status is required',
      'any.required': 'Status is required',
      'any.only':
        'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED',
    }),

  slot: Joi.array()
    .items(Joi.number().integer().min(1).max(16))
    .required()
    .messages({
      'array.base': 'Slot must be an array',
      'array.empty': 'Slot is required',
      'any.required': 'Slot is required',
      'array.includes':
        'Invalid slot. Each element must be a number between 1 and 16',
    }),
});

export const updateOrderSchema = Joi.object().keys({
  budget: Joi.number().optional().messages({
    'number.base': 'Budget should be a type of number',
    'any.required': 'Budget is a required field',
  }),

  phoneNumber: Joi.number().optional().messages({
    'number.base': 'Phone number should be a type of number',
    'any.required': 'Phone number is a required field',
  }),

  expectedStartDate: Joi.date().optional().messages({
    'date.base': 'Expected start date should be a valid date',
    'any.required': 'Expected start date is a required field',
  }),

  actualStartDate: Joi.date().optional().messages({
    'date.base': 'Actual start date should be a valid date',
    'any.required': 'Actual start date is a required field',
  }),

  location: Joi.object().keys({
    lat: Joi.number().optional().messages({
      'number.base': 'Latitude should be a type of number',
      'any.required': 'Latitude is a required field',
    }),

    lon: Joi.number().optional().messages({
      'number.base': 'Longitude should be a type of number',
      'any.required': 'Longitude is a required field',
    }),

    label: Joi.string().optional().messages({
      'string.base': 'Label should be a type of string',
      'any.required': 'Label is a required field',
    }),
  }),

  status: Joi.string()
    .valid('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only':
        'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED',
    }),

  slot: Joi.array()
    .items(Joi.number().integer().min(1).max(16))
    .optional()
    .messages({
      'array.base': 'Slot must be an array',
      'array.includes':
        'Invalid slot. Each element must be a number between 1 and 16',
    }),
});
