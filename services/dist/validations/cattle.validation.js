"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cattleTradeValidation = exports.userCallValidation = exports.getCattlesWithPaginationSchema = exports.cattleDeleteValidation = exports.cattleUpdateValidation = exports.cattleCreateValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cattleCreateValidation = joi_1.default.object().keys({
    birth_date: joi_1.default.string().required().messages({
        'number.base': `Birth Date should be a type of string`,
        'number.empty': `Birth Date cannot be an empty field`,
        'any.required': `Birth Date is a required field`,
    }),
    current_milk_capacity: joi_1.default.number().required().messages({
        'number.base': `Current Milk capacity should be a type of string`,
        'number.empty': `Current Milk capacity cannot be an empty field`,
        'any.required': `Current Milk capacity is a required field`,
    }),
    maximum_milk_capacity: joi_1.default.number().required().messages({
        'number.base': `Maximum Milk capacity should be a type of number`,
        'number.empty': `Maximum Milk capacity cannot be an empty field`,
        'any.required': `Maximum Milk capacity is a required field`,
    }),
    pregnancy_number: joi_1.default.number().required().messages({
        'number.base': `Pregnancy number should be a type of number`,
        'number.empty': `Pregnancy number cannot be an empty field`,
        'any.required': `Pregnancy number is a required field`,
    }),
    price: joi_1.default.number().required().messages({
        'number.base': `Pregnancy number should be a type of number`,
        'number.empty': `Pregnancy number cannot be an empty field`,
        'any.required': `Pregnancy number is a required field`,
    }),
    categoryId: joi_1.default.number().required().messages({
        'number.base': `Category should be a type of number`,
        'number.empty': `Category cannot be an empty field`,
        'any.required': `Category is a required field`,
    }),
    is_negotiable: joi_1.default.any()
        .messages({
        'boolean.base': `Negotiable should be a type of boolean`,
        'boolean.empty': `Negotiable cannot be an empty field`,
        'boolean.required': `Negotiable is a required field`,
    })
        .allow(null),
    lat: joi_1.default.number().required().messages({
        'number.base': `Latitude should be a type of number`,
        'number.empty': `Latitude cannot be an empty field`,
        'any.required': `Latitude is a required field`,
    }),
    long: joi_1.default.number().required().messages({
        'number.base': `Longitude should be a type of number`,
        'number.empty': `Longitude cannot be an empty field`,
        'any.required': `Longitude is a required field`,
    }),
    location: joi_1.default.object().keys({
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
    description: joi_1.default.string().required().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
        'any.required': `Description is a required field`,
    }),
    title: joi_1.default.string().required().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`,
    }),
    imageIds: joi_1.default.array().items(joi_1.default.string()),
    videoIds: joi_1.default.array().items(joi_1.default.string()),
});
exports.cattleUpdateValidation = joi_1.default.object().keys({
    imageIds: joi_1.default.array().items(joi_1.default.object().keys({
        id: joi_1.default.number().required().messages({
            'number.base': `Image Id should be a type of number`,
            'number.empty': `Image Id cannot be an empty field`,
            'any.required': `Image Id is a required field`,
        }),
        action: joi_1.default.string().valid('remove', 'modify').required().messages({
            'string.base': `Action should be a type of string`,
            'string.empty': `Action cannot be an empty field`,
            'any.required': `Action Id is a required field`,
        }),
        filename: joi_1.default.string().messages({
            'string.base': `Filename should be a type of string`,
            'string.empty': `Filename cannot be an empty field`,
            'any.required': `Filename is a required field`,
        }),
    })),
    videoIds: joi_1.default.array().items(joi_1.default.string()),
    birth_date: joi_1.default.string().messages({
        'number.base': `Birth Date should be a type of string`,
        'number.empty': `Birth Date cannot be an empty field`,
        'any.required': `Birth Date is a required field`,
    }),
    cattleId: joi_1.default.number().required().messages({
        'number.base': `Cattle Id should be a type of number`,
        'number.empty': `Cattle Id cannot be an empty field`,
        'any.required': `Cattle Id is a required field`,
    }),
    current_milk_capacity: joi_1.default.number().messages({
        'number.base': `Current Milk capacity should be a type of string`,
        'number.empty': `Current Milk capacity cannot be an empty field`,
        'any.required': `Current Milk capacity is a required field`,
    }),
    maximum_milk_capacity: joi_1.default.number().messages({
        'number.base': `Maximum Milk capacity should be a type of number`,
        'number.empty': `Maximum Milk capacity cannot be an empty field`,
        'any.required': `Maximum Milk capacity is a required field`,
    }),
    pregnancy_number: joi_1.default.number().messages({
        'number.base': `Pregnancy number should be a type of number`,
        'number.empty': `Pregnancy number cannot be an empty field`,
        'any.required': `Pregnancy number is a required field`,
    }),
    price: joi_1.default.number().messages({
        'number.base': `Pregnancy number should be a type of number`,
        'number.empty': `Pregnancy number cannot be an empty field`,
        'any.required': `Pregnancy number is a required field`,
    }),
    categoryId: joi_1.default.number().required().messages({
        'number.base': `Category should be a type of number`,
        'number.empty': `Category cannot be an empty field`,
        'any.required': `Category is a required field`,
    }),
    is_negotiable: joi_1.default.any()
        .messages({
        'boolean.base': `Negotiable should be a type of boolean`,
        'boolean.empty': `Negotiable cannot be an empty field`,
        'boolean.required': `Negotiable is a required field`,
    })
        .allow(null),
    lat: joi_1.default.number().required().messages({
        'number.base': `Latitude should be a type of number`,
        'number.empty': `Latitude cannot be an empty field`,
        'any.required': `Latitude is a required field`,
    }),
    long: joi_1.default.number().required().messages({
        'number.base': `Longitude should be a type of number`,
        'number.empty': `Longitude cannot be an empty field`,
        'any.required': `Longitude is a required field`,
    }),
    location: joi_1.default.object().keys({
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
    description: joi_1.default.string().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
        'any.required': `Description is a required field`,
    }),
    title: joi_1.default.string().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`,
    }),
});
exports.cattleDeleteValidation = joi_1.default.object().keys({
    cattleId: joi_1.default.number().required().messages({
        'number.base': `Cattle Id should be a type of number`,
        'number.empty': `Cattle Id cannot be an empty field`,
        'any.required': `Cattle Id is a required field`,
    }),
});
exports.getCattlesWithPaginationSchema = joi_1.default.object({
    minPrice: joi_1.default.number().integer().min(0).messages({
        'number.base': `Minimum price should be a type of number`,
        'number.integer': `Minimum price should be an integer`,
        'number.min': `Minimum price should be greater than or equal to 0`,
    }),
    categoryIds: joi_1.default.array().items(joi_1.default.number().integer().positive()),
    maxPrice: joi_1.default.number()
        .integer()
        .greater(joi_1.default.ref('minPrice'))
        .default(Number.MAX_SAFE_INTEGER)
        .messages({
        'number.base': `Maximum price should be a type of number`,
        'number.integer': `Maximum price should be an integer`,
        'number.greater': `Maximum price should be greater than minimum price`,
    }),
    location: joi_1.default.object().keys({
        lat: joi_1.default.number().messages({
            'string.base': `Latitude should be a type of string`,
            'string.empty': `Latitude cannot be an empty field`,
            'any.required': `Latitude is a required field`,
        }),
        long: joi_1.default.number().messages({
            'string.base': `Longitude should be a type of string`,
            'string.empty': `Longitude cannot be an empty field`,
            'any.required': `Longitude is a required field`,
        }),
    }),
    title: joi_1.default.string().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
    }),
    description: joi_1.default.string().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
    }),
    isNegotiable: joi_1.default.boolean().messages({
        'boolean.base': `Is negotiable should be a type of boolean`,
    }),
    currentMilkCapacity: joi_1.default.number().integer().min(0).messages({
        'number.base': `Current milk capacity should be a type of number`,
        'number.integer': `Current milk capacity should be an integer`,
        'number.min': `Current milk capacity should be greater than or equal to 0`,
    }),
    maximumMilkCapacity: joi_1.default.number().integer().min(0).messages({
        'number.base': `Maximum milk capacity should be a type of number`,
        'number.integer': `Maximum milk capacity should be an integer`,
        'number.min': `Maximum milk capacity should be greater than or equal to 0`,
    }),
    pregnancyNumber: joi_1.default.number().integer().min(0).messages({
        'number.base': `Pregnancy number should be a type of number`,
        'number.integer': `Pregnancy number should be an integer`,
        'number.min': `Pregnancy number should be greater than or equal to 0`,
    }),
    skip: joi_1.default.number().integer().min(0).default(0).messages({
        'number.base': `Skip should be a type of number`,
        'number.integer': `Skip should be an integer`,
        'number.min': `Skip should be greater than or equal to 0`,
    }),
    take: joi_1.default.number().integer().min(1).default(20).messages({
        'number.base': `Take should be a type of number`,
        'number.integer': `Take should be an integer`,
        'number.min': `Take should be greater than or equal to 1`,
    }),
    distance: joi_1.default.number().integer().min(0).messages({
        'number.base': `Distance should be a type of number`,
        'number.integer': `Distance should be an integer`,
        'number.min': `Distance should be greater than or equal to 0`,
    }),
});
exports.userCallValidation = joi_1.default.object().keys({
    phone_number: joi_1.default.string().required().messages({
        'string.base': `Phone number should be a type of string`,
        'string.empty': `Phone number cannot be an empty field`,
        'any.required': `Phone number is a required field`,
    }),
    recieverId: joi_1.default.number().required().messages({
        'number.base': `Reciever Id should be a type of number`,
        'number.empty': `Reciever Id cannot be an empty field`,
        'any.required': `Reciever Id is a required field`,
    }),
    cattleId: joi_1.default.number().required().messages({
        'number.base': `Cattle Id should be a type of number`,
        'number.empty': `Cattle Id cannot be an empty field`,
        'any.required': `Cattle Id is a required field`,
    }),
});
exports.cattleTradeValidation = joi_1.default.object().keys({
    cattleId: joi_1.default.number().required().messages({
        'number.base': `Cattle Id should be a type of number`,
        'number.empty': `Cattle Id cannot be an empty field`,
        'any.required': `Cattle Id is a required field`,
    }),
    is_sold: joi_1.default.any()
        .messages({
        'boolean.base': `Sold should be a type of boolean`,
        'boolean.empty': `Sold cannot be an empty field`,
        'boolean.required': `Sold is a required field`,
    })
});
