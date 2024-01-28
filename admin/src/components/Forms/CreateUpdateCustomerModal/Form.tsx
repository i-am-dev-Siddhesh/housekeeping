import CustomerService from '@/services/Customer/index';
import { addCustomer, updateCustomer } from '@/store/reducers/customer.reducer';
import { ICustomer } from '@/types/global';
import { parseLocationData } from '@/utils';
import { errorFormatter, useYupValidationResolver } from '@/utils/helpers';
import {
  customerUpdateValidationSchema,
  customerValidationSchema,
} from '@/validation/customer.validation';
import { Button, Flex, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomInput from '../FormControls';
import CustomPasswordInput from '../FormControls/CustomPasswordInput';

const GeolocationMap = dynamic(() => import('../../GeolocationMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});
const SearchField = dynamic(() => import('../../GeolocationMap/SearchField'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

interface IProps {
  onClose: () => void;
  customer?: ICustomer;
}
const CustomerForm = ({ onClose, customer }: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(
    customer ? customerUpdateValidationSchema : customerValidationSchema
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      let values = data
      const location = {
        lat: values?.location?.y,
        lon: values?.location?.x,
        label: values?.location?.label,
      };

      delete values.location;
      const formData = new FormData();
console.log('data',data.location);

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          // If it's a FileList (which is the type for file inputs), append each file
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value) {
          // For regular form fields
          // @ts-ignore
          formData.append(key, value);
        }
      });
      
      formData.append('location[lat]', location.lat);
      formData.append('location[lon]', location.lon);
      formData.append('location[label]', location.label);
      const resp = customer
        ? await CustomerService.updateCustomer(customer.id, formData)
        : await CustomerService.createCustomer(formData);
      dispatch(
        customer
          ? updateCustomer({ data: resp.data })
          : addCustomer({ data: resp.data })
      );
      toast({
        title: 'Success',
        description: `customer ${customer ? 'updated' : 'added'
          } successfully!!!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      const message = errorFormatter(error);
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (customer) {
      reset({
        location: customer.location,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      });
    }
  }, [customer]);

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
        handleSubmit(handleFormSubmit)();
      }}
    >
      <Flex gap={5} flexDir="column" w="100%" bg="#ffffff">
        <CustomInput
          register={register}
          error={(errors['name']?.message as string) || ''}
          type="text"
          helperText="Enter name here"
          label="Name"
          name="name"
          placeholder="Enter your name"
        />
        
        <CustomInput
          register={register}
          error={(errors['email']?.message as string) || ''}
          type="text"
          helperText="Enter email here"
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <CustomPasswordInput
          register={register}
          error={(errors['password']?.message as string) || ''}
          helperText="Enter password here"
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
        <CustomInput
          register={register}
          error={(errors['phoneNumber']?.message as string) || ''}
          type="text"
          helperText="Enter phone number here"
          label="Phone Number"
          name="phoneNumber"
          placeholder="Enter your phone number"
        />

        <CustomInput
          register={register}
          error={(errors['profile']?.message as string) || ''}
          type="file"
          helperText="Upload profile image"
          label="Profile Image"
          name="profile"
          value={watch('profile')}
          placeholder="Upload your profile image"
        />

        <SearchField
          register={register}
          errors={errors}
          value={parseLocationData(watch('location'))}
          setValue={setValue}
        />

        <GeolocationMap
          lat={parseLocationData(watch('location'))?.lat}
          long={parseLocationData(watch('location'))?.lon}
        />

        <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomerForm;
