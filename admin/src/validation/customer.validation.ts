import * as yup from 'yup';

export const customerValidationSchema = yup.object({
  name: yup.string().required('Please enter your name.'),
  phoneNumber: yup.string().required('Please provide a valid phone number.'),
  email: yup.string().email().required('Please provide a valid email.'),
  location: yup.object(),
  profile: yup
    .mixed()
    .required('Please upload your profile picture.')
    .test(
      'fileSize',
      'Profile picture size must be less than 1 MB.',
      // @ts-ignore
      (value) => value && value[0]?.size <= 1024000
    ),
});

export const customerUpdateValidationSchema = yup.object({
  name: yup.string(),
  phoneNumber: yup.string(),
  email: yup.string().email(),
  location: yup.object(),
  profile: yup
    .mixed()
    .nullable()
    .transform((originalValue, originalObject) =>
      originalObject.profile ? originalValue : null
    )
    .test(
      'fileSize',
      'Profile picture size must be less than 1 MB.',
      // @ts-ignore
      (value) => !value || (value[0]?.size && value[0]?.size <= 1024000)
    ),
});
