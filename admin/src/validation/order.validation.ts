import * as yup from 'yup';

export const createOrderSchema = yup.object().shape({
  customerId: yup.number().required('Customer id is a required field'),
  budget: yup.number().required('Budget is a required field'),
  phoneNumber: yup.number().required('Phone number is a required field'),
  expectedStartDate: yup.date().required('Expected start date is a required field'),
  actualStartDate: yup.date().required('Actual start date is a required field'),
  location: yup.object().shape({
    lat: yup.number().required('Latitude is a required field'),
    lon: yup.number().required('Longitude is a required field'),
    label: yup.string().required('Label is a required field'),
  }),
  status: yup.string().required().oneOf(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  slots: yup.array().of(
    yup.number().integer().min(1).max(16).required('Each slot must be a number between 1 and 16')
  ).required('Slots is a required field'),
});

export const updateOrderSchema = yup.object().shape({
  customerId: yup.number().typeError('Customer id should be a type of number'),
  budget: yup.number().typeError('Budget should be a type of number'),
  phoneNumber: yup.number().typeError('Phone number should be a type of number'),
  expectedStartDate: yup.date().typeError('Expected start date should be a valid date'),
  actualStartDate: yup.date().typeError('Actual start date should be a valid date'),
  location: yup.object().shape({
    lat: yup.number().typeError('Latitude should be a type of number'),
    lon: yup.number().typeError('Longitude should be a type of number'),
    label: yup.string().typeError('Label should be a type of string'),
  }),
  status: yup.string().oneOf(
    ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED'
  ),
  slots: yup.array().of(
    yup.number().integer().min(1).max(16).typeError('Each slot must be a number between 1 and 16')
  ),
});
