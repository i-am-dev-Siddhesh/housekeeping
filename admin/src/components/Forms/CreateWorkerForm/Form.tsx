import { useYupValidationResolver } from '@/utils/helpers';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomInput from '../FormControls';
import dynamic from 'next/dynamic';
import { DEFAULT_LOCATION } from '@/utils/constant';
import { parseLocationData } from '@/utils';
const GeolocationMap = dynamic(
  () => import('../../GeolocationMap'),
  { ssr: false, loading: () => <p>Loading map...</p> }
);
const SearchField = dynamic(
  () => import('../../../components/GeolocationMap/SearchField'),
  { ssr: false, loading: () => <p>Loading map...</p> }
);
const AddWorkerForm = ({ onSubmit, isSubmitting }: any) => {
 

  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    phoneNumber: yup.string().required('Required'),
    kycVerified: yup.boolean().required('Required'),
    availableFrom: yup.date().required('Required'),
    location: yup.object(),
    minimumRequiredMonthlyIncome: yup.number().required('Required'),
    leavesTaken: yup.number().required('Required'),
    // @ts-ignore
    profile: yup.mixed().required('Required').test('fileSize', 'File size is too large', (value) => value && value[0].size <= 1024000),
    // @ts-ignore
    aadhaar: yup.mixed().required('Required').test('fileSize', 'File size is too large', (value) => value && value[0].size <= 1024000),
  });

  //   const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm(
    {
      defaultValues: {

        location: JSON.stringify(DEFAULT_LOCATION),
        name: '',
        phoneNumber: '',
        availableFrom: '',
        kycVerified: false,
        minimumRequiredMonthlyIncome: '',
        leavesTaken: '',
        profile: null,
        aadhaar: null
      }

    }
  );

  return (
    <Flex
      gap={5}
      minH="100vh"
      overflowY="scroll"
      overflowX="scroll"
      alignItems="center"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <Flex
        gap={5}
        flexDir="column"
        w={{ base: '100%', md: '50rem' }}
        // mx={{ base: '10px', md: 'auto' }}
        px={{ base: '20px', md: '80px' }}
        py={{ base: '10px', md: '40px' }}
        bg="#ffffff"
      >
        <CustomInput
          register={register}
          error={(errors['name']?.message as string) || ''}
          type="text"
          helperText="Enter name here"
          label="Name"
          name="name"
        />
        <CustomInput
          register={register}
          error={(errors['phoneNumber']?.message as string) || ''}
          type="text"
          helperText="Enter phone number here"
          label="Phone Number"
          name="phoneNumber"
        />
        <CustomInput
          register={register}
          error={(errors['kycVerified']?.message as string) || ''}
          type="checkbox"
          label="KYC Verified"
          name="kycVerified"
        />
        <CustomInput
          register={register}
          error={(errors['availableFrom']?.message as string) || ''}
          type="date"
          helperText="Select available from date"
          label="Available From"
          name="availableFrom"
        />
        <CustomInput
          register={register}
          error={(errors['profile']?.message as string) || ''}
          type="file"
          helperText="Upload profile image"
          label="Profile Image"
          name="profile"
          value={watch('profile')}
        />
        <CustomInput
          register={register}
          error={(errors['aadhaar']?.message as string) || ''}
          type="file"
          helperText="Upload Aadhaar image"
          label="Aadhaar Image"
          name="aadhaar"
          value={watch('aadhaar')}
        />
        <SearchField register={register}
          errors={errors}  setValue={setValue} />
        <GeolocationMap lat={parseLocationData(watch('location'))?.lat} long={parseLocationData(watch('location'))?.lon} />
        <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddWorkerForm;
