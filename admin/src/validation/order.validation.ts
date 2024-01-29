import * as yup from 'yup';

export const createOrderSchema = yup.object().shape({
  customerPhoneNumber: yup
    .string()
    .required('Customer Phone Number is a required field')
    .typeError('Customer Phone number should be a type of number'),
  budget: yup
    .number()
    .required('Budget is a required field')
    .typeError('Budget should be a type of number'),
  phoneNumber: yup
    .string()
    .required('Phone number is a required field')
    .typeError('Phone number should be a type of number'),
  expectedStartDate: yup
    .date()
    .required('Expected start date is a required field')
    .typeError('Expected start date should be a valid date'),
  actualStartDate: yup
    .date()
    .typeError('Actual start date should be a valid date'),
  location: yup.object().shape({
    lat: yup
      .number()
      .required('Latitude is a required field')
      .typeError('Latitude should be a type of number'),
    lon: yup
      .number()
      .required('Longitude is a required field')
      .typeError('Longitude should be a type of number'),
    label: yup.string().required('Label is a required field'),
  }),
  status: yup
    .string()
    .oneOf(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
    .typeError('Status must be a string'),
  slots: yup
    .array()
    .of(
      yup
        .number()
        .integer()
        .required('Each slot must be a number between 1 and 17')
        .typeError('Each slot must be a number between 1 and 17')
    )
    .min(1, 'Slots must not be an empty array')
    .required('Slots is a required field')
    .typeError('Slots must be an array'),
});

export const updateOrderSchema = yup.object().shape({
  customerId: yup.number().typeError('Customer id should be a type of number'),
  budget: yup.number().typeError('Budget should be a type of number'),
  phoneNumber: yup
    .string()
    .typeError('Phone number should be a type of number'),
  expectedStartDate: yup
    .date()
    .typeError('Expected start date should be a valid date'),
  actualStartDate: yup
    .date()
    .typeError('Actual start date should be a valid date'),
  location: yup.object().shape({
    lat: yup.number().typeError('Latitude should be a type of number'),
    lon: yup.number().typeError('Longitude should be a type of number'),
    label: yup.string().typeError('Label should be a type of string'),
  }),
  status: yup
    .string()
    .oneOf(
      ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      'Invalid status. Must be one of PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED'
    ),
  slots: yup
    .array()
    .of(
      yup
        .number()
        .integer()
        .required('Each slot must be a number between 1 and 17')
        .typeError('Each slot must be a number between 1 and 17')
    )
    .min(1, 'Slots must not be an empty array')
    .required('Slots is a required field')
    .typeError('Slots must be an array'),
});
