import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  Checkbox,
  Box,
} from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
interface IProps {
  label: string;
  type: string;
  register: any;
  helperText?: string;
  error: string;
  name: string;
  rightIcon?: any;
  onChange?: any;
  value?: any;
}

const CustomInput = ({
  label,
  type,
  register,
  helperText,
  error,
  name,
  rightIcon,
  value,
}: IProps) => {
  return (
    <>
      <FormControl isInvalid={error ? true : false}>
        {type !== 'checkbox' && <FormLabel color="black">{label}</FormLabel>}
        {type === 'checkbox' ? (
          <Checkbox colorScheme="green" {...register(name)}>
            {label}
          </Checkbox>
        ) : (
          <InputGroup>
            <Input
              color="black"
              {...register(name)}
              type={type}
              accept="image/*"
            />
            {rightIcon}
          </InputGroup>
        )}
        {error ? (
          <FormErrorMessage color="red">{error}</FormErrorMessage>
        ) : (
          helperText && (
            <FormHelperText fontWeight="500" color="gray.500">
              {helperText}
            </FormHelperText>
          )
        )}
      </FormControl>
      {value && value instanceof FileList && value.length > 0 && (
        <Box ml="4" mt="2">
          <img
            src={URL.createObjectURL(value[0])}
            alt="Uploaded Image"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: 'md',
            }}
          />
        </Box>
      )}
    </>
  );
};

export default CustomInput;
