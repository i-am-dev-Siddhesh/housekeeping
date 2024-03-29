import Joi from 'joi';

export const createOrderSchema = Joi.object().keys({
  customerPhoneNumber: Joi.string().required().messages({
    'string.base': 'Customer Phone Number should be a type of string',
    'string.empty': 'Customer Phone Number cannot be an empty field',
    'any.required': 'Customer Phone Number is a required field',
  }),
  budget: Joi.number().required().messages({
    'string.base': 'Budget should be a type of string',
    'string.empty': 'Budget cannot be an empty field',
    'any.required': 'Budget is a required field',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number should be a type of string',
    'string.empty': 'Phone number cannot be an empty field',
    'any.required': 'Phone number is a required field',
  }),
  expectedStartDate: Joi.date().required().messages({
    'date.base': 'Expected start date should be a valid date',
    'any.required': 'Expected start date from is a required field',
  }),
  actualStartDate: Joi.date().messages({
    'date.base': 'Actual start date should be a valid date',
    'any.required': 'Actual start date from is a required field',
  }).optional(),
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

  slots: Joi.array()
    .items(Joi.number().integer().min(1).max(17))
    .required()
    .messages({
      'array.base': 'Slots must be an array',
      'array.empty': 'Slotss is required',
      'any.required': 'Slots is required',
      'array.includes':
        'Invalid slots. Each element must be a number between 1 and 17',
    }),
});

export const updateOrderSchema = Joi.object().keys({
  customerPhoneNumber: Joi.string().required().messages({
    'string.base': 'Customer Phone Number should be a type of string',
    'string.empty': 'Customer Phone Number cannot be an empty field',
    'any.required': 'Customer Phone Number is a required field',
  }),
  customerId: Joi.number().messages({
    'string.base': 'Customer id should be a type of string',
    'string.empty': 'Customer id cannot be an empty field',
  }),
  budget: Joi.number().optional().messages({
    'number.base': 'Budget should be a type of number',
    'any.required': 'Budget is a required field',
  }),

  phoneNumber: Joi.string().optional().messages({
    'string.base': 'Phone number should be a type of number',
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

  slots: Joi.array()
    .items(Joi.number().integer().min(1).max(17))
    .optional()
    .messages({
      'array.base': 'Slots must be an array',
      'array.includes':
        'Invalid slots. Each element must be a number between 1 and 17',
    }),
});
