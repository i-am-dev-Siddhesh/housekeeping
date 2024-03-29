import Joi from 'joi';

export const createWorkerSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name cannot be an empty field',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.number().required().messages({
    'number.base': 'Phone number should be a type of number',
    'number.empty': 'Phone number cannot be an empty field',
    'any.required': 'Phone number is a required field',
  }),
  kycVerified: Joi.boolean().default(false).messages({
    'boolean.base': 'KYC verification should be a type of boolean',
  }),
  availableFrom: Joi.date().required().messages({
    'date.base': 'Available from should be a valid date',
    'any.required': 'Available from is a required field',
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
  minimumRequiredMonthlyIncome: Joi.number().required().messages({
    'number.base': 'Minimum required monthly income should be a type of number',
  }),
  leavesTaken: Joi.number().default(0).messages({
    'number.base': 'Leaves taken should be a type of number',
  }),
  profileUrl: Joi.string().messages({
    'string.base': 'Profile URL should be a type of string',
  }),
});

export const updateWorkerSchema = Joi.object()
  .keys({
    name: Joi.string().messages({
      'string.base': 'Name should be a type of string',
      'string.empty': 'Name cannot be an empty field',
    }),
    reason: Joi.string().required().messages({
      'string.base': 'Reason should be a type of string',
      'string.empty': 'Reason cannot be an empty field',
      'any.required': `Reason is a required field`,
    }),
    phoneNumber: Joi.number().messages({
      'number.base': 'Phone number should be a type of number',
      'number.empty': 'Phone number cannot be an empty field',
    }),
    kycVerified: Joi.boolean().messages({
      'boolean.base': 'KYC verification should be a type of boolean',
    }),
    availableFrom: Joi.date().messages({
      'date.base': 'Available from should be a valid date',
    }),
    location: Joi.object().keys({
      lat: Joi.number().messages({
        'number.base': 'Latitude should be a type of number',
      }),
      lon: Joi.number().messages({
        'number.base': 'Longitude should be a type of number',
      }),
      label: Joi.string().messages({
        'string.base': 'Label should be a type of string',
        'string.empty': 'Label cannot be an empty field',
      }),
    }),
    minimumRequiredMonthlyIncome: Joi.number().messages({
      'number.base':
        'Minimum required monthly income should be a type of number',
    }),
    leavesTaken: Joi.number().messages({
      'number.base': 'Leaves taken should be a type of number',
    }),
    profileUrl: Joi.string().messages({
      'string.base': 'Profile URL should be a type of string',
    }),
  })
  .optional();

export const createCustomerSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name cannot be an empty field',
    'any.required': 'Name is a required field',
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of string`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
  }),
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
  phoneNumber: Joi.number().required().messages({
    'number.base': 'Phone number should be a type of number',
    'number.empty': 'Phone number cannot be an empty field',
    'any.required': 'Phone number is a required field',
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
      'any.required': `Longitude is a required field`,
    }),
  }).required(),
});

export const updateCustomerSchema = Joi.object()
  .keys({
    name: Joi.string().messages({
      'string.base': 'Name should be a type of string',
      'string.empty': 'Name cannot be an empty field',
    }),
    password: Joi.string().required().messages({
      'string.base': `Password should be a type of string`,
      'string.empty': `Password cannot be an empty field`,
      'any.required': `Password is a required field`,
    }),
    email: Joi.string().required().messages({
      'string.base': `Email should be a type of string`,
      'string.empty': `Email cannot be an empty field`,
      'any.required': `Email is a required field`,
    }),
    phoneNumber: Joi.number().messages({
      'number.base': 'Phone number should be a type of number',
      'number.empty': 'Phone number cannot be an empty field',
    }),

    location: Joi.object().keys({
      lat: Joi.number().messages({
        'number.base': 'Latitude should be a type of number',
      }),
      lon: Joi.number().messages({
        'number.base': 'Longitude should be a type of number',
      }),
      label: Joi.string().messages({
        'string.base': 'Label should be a type of string',
        'string.empty': 'Label cannot be an empty field',
      }),
    }),
  })
  .optional();
