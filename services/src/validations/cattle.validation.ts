import Joi from 'joi';

export const cattleCreateValidation = Joi.object().keys({
  birth_date: Joi.string().required().messages({
    'number.base': `Birth Date should be a type of string`,
    'number.empty': `Birth Date cannot be an empty field`,
    'any.required': `Birth Date is a required field`,
  }),
  current_milk_capacity: Joi.number().required().messages({
    'number.base': `Current Milk capacity should be a type of string`,
    'number.empty': `Current Milk capacity cannot be an empty field`,
    'any.required': `Current Milk capacity is a required field`,
  }),
  maximum_milk_capacity: Joi.number().required().messages({
    'number.base': `Maximum Milk capacity should be a type of number`,
    'number.empty': `Maximum Milk capacity cannot be an empty field`,
    'any.required': `Maximum Milk capacity is a required field`,
  }),
  pregnancy_number: Joi.number().required().messages({
    'number.base': `Pregnancy number should be a type of number`,
    'number.empty': `Pregnancy number cannot be an empty field`,
    'any.required': `Pregnancy number is a required field`,
  }),
  price: Joi.number().required().messages({
    'number.base': `Pregnancy number should be a type of number`,
    'number.empty': `Pregnancy number cannot be an empty field`,
    'any.required': `Pregnancy number is a required field`,
  }),

  categoryId: Joi.number().required().messages({
    'number.base': `Category should be a type of number`,
    'number.empty': `Category cannot be an empty field`,
    'any.required': `Category is a required field`,
  }),
  is_negotiable: Joi.any()
    .messages({
      'boolean.base': `Negotiable should be a type of boolean`,
      'boolean.empty': `Negotiable cannot be an empty field`,
      'boolean.required': `Negotiable is a required field`,
    })
    .allow(null),
  lat: Joi.number().required().messages({
    'number.base': `Latitude should be a type of number`,
    'number.empty': `Latitude cannot be an empty field`,
    'any.required': `Latitude is a required field`,
  }),
  long: Joi.number().required().messages({
    'number.base': `Longitude should be a type of number`,
    'number.empty': `Longitude cannot be an empty field`,
    'any.required': `Longitude is a required field`,
  }),
  location: Joi.object().keys({
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
  description: Joi.string().required().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
    'any.required': `Description is a required field`,
  }),
  title: Joi.string().required().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
    'any.required': `Title is a required field`,
  }),
  imageIds: Joi.array().items(Joi.string()),
  videoIds: Joi.array().items(Joi.string()),
});

export const cattleUpdateValidation = Joi.object().keys({
  imageIds: Joi.array().items(
    Joi.object().keys({
      id: Joi.number().required().messages({
        'number.base': `Image Id should be a type of number`,
        'number.empty': `Image Id cannot be an empty field`,
        'any.required': `Image Id is a required field`,
      }),
      action: Joi.string().valid('remove', 'modify').required().messages({
        'string.base': `Action should be a type of string`,
        'string.empty': `Action cannot be an empty field`,
        'any.required': `Action Id is a required field`,
      }),
      filename: Joi.string().messages({
        'string.base': `Filename should be a type of string`,
        'string.empty': `Filename cannot be an empty field`,
        'any.required': `Filename is a required field`,
      }),
    })
  ),
  videoIds: Joi.array().items(Joi.string()),
  birth_date: Joi.string().messages({
    'number.base': `Birth Date should be a type of string`,
    'number.empty': `Birth Date cannot be an empty field`,
    'any.required': `Birth Date is a required field`,
  }),
  cattleId: Joi.number().required().messages({
    'number.base': `Cattle Id should be a type of number`,
    'number.empty': `Cattle Id cannot be an empty field`,
    'any.required': `Cattle Id is a required field`,
  }),
  current_milk_capacity: Joi.number().messages({
    'number.base': `Current Milk capacity should be a type of string`,
    'number.empty': `Current Milk capacity cannot be an empty field`,
    'any.required': `Current Milk capacity is a required field`,
  }),
  maximum_milk_capacity: Joi.number().messages({
    'number.base': `Maximum Milk capacity should be a type of number`,
    'number.empty': `Maximum Milk capacity cannot be an empty field`,
    'any.required': `Maximum Milk capacity is a required field`,
  }),
  pregnancy_number: Joi.number().messages({
    'number.base': `Pregnancy number should be a type of number`,
    'number.empty': `Pregnancy number cannot be an empty field`,
    'any.required': `Pregnancy number is a required field`,
  }),
  price: Joi.number().messages({
    'number.base': `Pregnancy number should be a type of number`,
    'number.empty': `Pregnancy number cannot be an empty field`,
    'any.required': `Pregnancy number is a required field`,
  }),
  categoryId: Joi.number().required().messages({
    'number.base': `Category should be a type of number`,
    'number.empty': `Category cannot be an empty field`,
    'any.required': `Category is a required field`,
  }),
  is_negotiable: Joi.any()
    .messages({
      'boolean.base': `Negotiable should be a type of boolean`,
      'boolean.empty': `Negotiable cannot be an empty field`,
      'boolean.required': `Negotiable is a required field`,
    })
    .allow(null),

  lat: Joi.number().required().messages({
    'number.base': `Latitude should be a type of number`,
    'number.empty': `Latitude cannot be an empty field`,
    'any.required': `Latitude is a required field`,
  }),
  long: Joi.number().required().messages({
    'number.base': `Longitude should be a type of number`,
    'number.empty': `Longitude cannot be an empty field`,
    'any.required': `Longitude is a required field`,
  }),

  location: Joi.object().keys({
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
  description: Joi.string().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
    'any.required': `Description is a required field`,
  }),
  title: Joi.string().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
    'any.required': `Title is a required field`,
  }),
});

export const cattleDeleteValidation = Joi.object().keys({
  cattleId: Joi.number().required().messages({
    'number.base': `Cattle Id should be a type of number`,
    'number.empty': `Cattle Id cannot be an empty field`,
    'any.required': `Cattle Id is a required field`,
  }),
});

export const getCattlesWithPaginationSchema = Joi.object({
  minPrice: Joi.number().integer().min(0).messages({
    'number.base': `Minimum price should be a type of number`,
    'number.integer': `Minimum price should be an integer`,
    'number.min': `Minimum price should be greater than or equal to 0`,
  }),
  categoryIds: Joi.array().items(Joi.number().integer().positive()),
  maxPrice: Joi.number()
    .integer()
    .greater(Joi.ref('minPrice'))
    .default(Number.MAX_SAFE_INTEGER)
    .messages({
      'number.base': `Maximum price should be a type of number`,
      'number.integer': `Maximum price should be an integer`,
      'number.greater': `Maximum price should be greater than minimum price`,
    }),
  location: Joi.object().keys({
    lat: Joi.number().messages({
      'string.base': `Latitude should be a type of string`,
      'string.empty': `Latitude cannot be an empty field`,
      'any.required': `Latitude is a required field`,
    }),
    long: Joi.number().messages({
      'string.base': `Longitude should be a type of string`,
      'string.empty': `Longitude cannot be an empty field`,
      'any.required': `Longitude is a required field`,
    }),
  }),
  title: Joi.string().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
  }),
  description: Joi.string().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
  }),
  isNegotiable: Joi.boolean().messages({
    'boolean.base': `Is negotiable should be a type of boolean`,
  }),
  currentMilkCapacity: Joi.number().integer().min(0).messages({
    'number.base': `Current milk capacity should be a type of number`,
    'number.integer': `Current milk capacity should be an integer`,
    'number.min': `Current milk capacity should be greater than or equal to 0`,
  }),
  maximumMilkCapacity: Joi.number().integer().min(0).messages({
    'number.base': `Maximum milk capacity should be a type of number`,
    'number.integer': `Maximum milk capacity should be an integer`,
    'number.min': `Maximum milk capacity should be greater than or equal to 0`,
  }),
  pregnancyNumber: Joi.number().integer().min(0).messages({
    'number.base': `Pregnancy number should be a type of number`,
    'number.integer': `Pregnancy number should be an integer`,
    'number.min': `Pregnancy number should be greater than or equal to 0`,
  }),
  skip: Joi.number().integer().min(0).default(0).messages({
    'number.base': `Skip should be a type of number`,
    'number.integer': `Skip should be an integer`,
    'number.min': `Skip should be greater than or equal to 0`,
  }),
  take: Joi.number().integer().min(1).default(20).messages({
    'number.base': `Take should be a type of number`,
    'number.integer': `Take should be an integer`,
    'number.min': `Take should be greater than or equal to 1`,
  }),
  distance: Joi.number().integer().min(0).messages({
    'number.base': `Distance should be a type of number`,
    'number.integer': `Distance should be an integer`,
    'number.min': `Distance should be greater than or equal to 0`,
  }),
});

export const userCallValidation = Joi.object().keys({
  phone_number: Joi.string().required().messages({
    'string.base': `Phone number should be a type of string`,
    'string.empty': `Phone number cannot be an empty field`,
    'any.required': `Phone number is a required field`,
  }),

  recieverId: Joi.number().required().messages({
    'number.base': `Reciever Id should be a type of number`,
    'number.empty': `Reciever Id cannot be an empty field`,
    'any.required': `Reciever Id is a required field`,
  }),

  cattleId: Joi.number().required().messages({
    'number.base': `Cattle Id should be a type of number`,
    'number.empty': `Cattle Id cannot be an empty field`,
    'any.required': `Cattle Id is a required field`,
  }),
});

export const cattleTradeValidation = Joi.object().keys({
  cattleId: Joi.number().required().messages({
    'number.base': `Cattle Id should be a type of number`,
    'number.empty': `Cattle Id cannot be an empty field`,
    'any.required': `Cattle Id is a required field`,
  }), 
  is_sold: Joi.any()
    .messages({
      'boolean.base': `Sold should be a type of boolean`,
      'boolean.empty': `Sold cannot be an empty field`,
      'boolean.required': `Sold is a required field`,
    })
});
