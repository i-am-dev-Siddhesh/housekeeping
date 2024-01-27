import * as yup from 'yup';

export const workerValidationSchema = yup.object({
  name: yup.string().required('Please enter your name.'),
  phoneNumber: yup.string().required('Please provide a valid phone number.'),
  kycVerified: yup
    .boolean()
    .required('Please confirm whether you are KYC verified.'),
  availableFrom: yup
    .date()
    .required('Please specify the date you are available from.'),
  location: yup.object(),
  minimumRequiredMonthlyIncome: yup
    .number()
    .required('Please enter your minimum required monthly income.'),
  // leavesTaken: yup.number().required('Required'),

  profile: yup
    .mixed()
    .required('Please upload your profile picture.')
    // @ts-ignore
    .test(
      'fileSize',
      'Profile picture size must be less than 1 MB.',
      // @ts-ignore
      (value) => value && value[0].size <= 1024000
    ),
  aadhaar: yup
    .mixed()
    .required('Please upload your Aadhaar card.')
    .test(
      'fileSize',
      'Aadhaar card size must be less than 1 MB.',
    // @ts-ignore
      (value) => value && value[0].size <= 1024000
    ),
});
