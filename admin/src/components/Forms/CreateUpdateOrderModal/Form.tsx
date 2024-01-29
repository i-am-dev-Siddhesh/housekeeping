import OrderService from '@/services/Order/index';
import { addOrder, updateOrder } from '@/store/reducers/order.reducer';
import { IOrder, ISlot } from '@/types/global';
import { errorFormatter, useYupValidationResolver } from '@/utils/helpers';
import {
  createOrderSchema,
  updateOrderSchema,
} from '@/validation/order.validation';
import { Button, Flex, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomInput from '../FormControls';
import { parseLocationData } from '@/utils';
import SlotSelection from '@/components/SlotSelection';
import { useEffect, useMemo } from 'react';

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
  order?: IOrder;
}
const OrderForm = ({ onClose, order }: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(
    order ? updateOrderSchema : createOrderSchema
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

  const handleFormSubmit = async (values: any) => {
    try {
      const resp = order
        ? await OrderService.updateOrder(order?.id, values)
        : await OrderService.createOrder(values);
      dispatch(
        order ? updateOrder({ data: resp.data }) : addOrder({ data: resp.data })
      );
      toast({
        title: 'Success',
        description: `Order ${order ? 'updated' : 'added'} successfully!!!`,
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
    if (order) {
      reset({
        location: order.location,
        phoneNumber: order.phoneNumber,
        customerPhoneNumber: order?.customer?.phoneNumber,
        budget: order.budget,
        expectedStartDate: order.expectedStartDate &&
          new Date(order.expectedStartDate)?.toISOString()?.split('T')[0],
        actualStartDate: order.actualStartDate &&
          new Date(order.actualStartDate)?.toISOString()?.split('T')[0],
        status: order.status,
        slots: order.slots.map((slot: ISlot) => slot.slotNumber),
      });
    }
  }, [order]);

  const fields = useMemo(() => {
    let arr: any[] = [...formFields]
    if (order) {
      arr.push(...formFields2)
    }
    return arr
  }, [formFields, order])
  console.log('order',order);
  
  return (
    <Flex
      gap={5}
      // minH="10rem"
      overflowY="scroll"
      overflowX="scroll"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit)();
      }}
    >
      <Flex gap={5} flexDir="column" w="100%" bg="#ffffff">
        {fields?.map((item, index) => {
          return (
            <div key={item.name + '-' + index}>
              <CustomInput
                register={register}
                error={(errors[item.name]?.message as string) || ''}
                type={item.type}
                helperText={item.helperText}
                label={item.label}
                name={item.name}
                placeholder={item.placeholder}
                options={item?.options}
              />
            </div>
          );
        })}

        <SlotSelection
          setValue={setValue}
          value={watch("slots") || []}
          error={(errors['slots']?.message as string) || ''}
          helperText='Choose slots'
          label='Choose slots'
        />
        <SearchField
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

export default OrderForm;

export const formFields = [
  {
    name: 'customerPhoneNumber',
    label: 'Customer Phone Number',
    helperText: 'Customer phone number',
    type: 'text',
    placeholder: 'Enter customer phone number here',
  },
  {
    name: 'budget',
    label: 'Budget',
    helperText: 'Enter budget here',
    type: 'select',
    placeholder: 'Enter the budget',
    options: [
      {
        label: '<5000',
        value: 5000,
      },
      {
        label: '5000 - 7500',
        value: 7500,
      },
      {
        label: '7000 - 10000',
        value: 10000,
      },
      {
        label: '>10000',
        value: 10001,
      },
    ],
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    helperText: 'Enter phone number here',
    type: 'text',
    placeholder: 'Enter your phone number',
  },
  {
    name: 'expectedStartDate',
    label: 'Expected Start Date',
    helperText: 'Enter expected start date here',
    type: 'date',
    placeholder: 'Select expected start date',
  },

];


const formFields2 = [{
  name: 'actualStartDate',
  label: 'Actual Start Date',
  helperText: 'Enter actual start date here',
  type: 'date',
  placeholder: 'Select actual start date',
},
{
  name: 'status',
  label: 'Status',
  helperText: 'Select order status',
  type: 'select',
  placeholder: 'Select order status',
  options: [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Assigned', value: 'ASSIGNED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ]
},]