import WorkerService from '@/services/Worker';
import { addWorker } from '@/store/reducers/worker.reducer';
import { parseLocationData } from '@/utils';
import { DEFAULT_LOCATION } from '@/utils/constant';
import { errorFormatter, useYupValidationResolver } from '@/utils/helpers';
import { workerUpdateValidationSchema, workerValidationSchema } from '@/validation/woker.validation';
import { Button, Flex, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomInput from '../FormControls';
import { useEffect } from 'react';
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
  worker: any;
}
const WorkerForm = ({ onClose, worker }: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(workerUpdateValidationSchema)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset
  } = useForm({
    resolver
  });

  const handleFormSubmit = async (data: any) => {
    try {

      const location = {
        lat: data?.location?.x,
        long: data?.location?.y,
      };

      delete data.location;
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          // If it's a FileList (which is the type for file inputs), append each file
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else  if(value){
          // For regular form fields
          // @ts-ignore
          formData.append(key, value);
        }
      });
      formData.append('location[latitude]', location.lat);
      formData.append('location[longitude]', location.long);
      const resp = worker ? await WorkerService.updateWorker(worker.id, formData) : await WorkerService.createWorker(formData);
      dispatch(worker ? addWorker({ data: resp.data }) : addWorker({ data: resp.data }));
      toast({
        title: 'Success',
        description: `Worker ${worker ? "updated" : "added"} successfully!!!`,
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
    if (worker) {
      reset({
        location: DEFAULT_LOCATION,
        name: worker.name,
        phoneNumber: worker.phoneNumber,
        availableFrom: worker.availableFrom,
        kycVerified: worker.kycVerified,
        minimumRequiredMonthlyIncome: worker.minimumRequiredMonthlyIncome,
        leavesTaken: worker.leavesTaken,
      })
    }

  }, [worker])

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
          error={(errors['phoneNumber']?.message as string) || ''}
          type="text"
          helperText="Enter phone number here"
          label="Phone Number"
          name="phoneNumber"
          placeholder="Enter your phone number"
        />

        <CustomInput
          register={register}
          error={(errors['availableFrom']?.message as string) || ''}
          type="date"
          helperText="Select available from date"
          label="Available From"
          name="availableFrom"
          placeholder="Select available from date"
        />

        <CustomInput
          register={register}
          error={
            (errors['minimumRequiredMonthlyIncome']?.message as string) || ''
          }
          type="text"
          helperText="Enter your expected minimum earning"
          label="Minimum Earnings"
          name="minimumRequiredMonthlyIncome"
          placeholder="Enter your expected minimum earning"
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

        <CustomInput
          register={register}
          error={(errors['aadhaar']?.message as string) || ''}
          type="file"
          helperText="Upload Aadhaar image"
          label="Aadhaar Image"
          name="aadhaar"
          value={watch('aadhaar')}
          placeholder="Upload your Aadhaar image"
        />
        <SearchField register={register} errors={errors} setValue={setValue} />
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

export default WorkerForm;