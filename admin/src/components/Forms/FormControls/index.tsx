import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
interface IProps {
  label: string;
  type: string;
  register: any;
  helperText: string;
  error: string;
  name: string;
  rightIcon?: any;
  onChange?: any;
}

const CustomInput = ({
  label,
  type,
  register,
  helperText,
  error,
  name,
  rightIcon,
}: IProps) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel color="black">{label}</FormLabel>
      <InputGroup>
        <Input color="black" {...register(name)} type={type} />
        {rightIcon}
      </InputGroup>
      {error ? (
        <FormErrorMessage color="red">{error}</FormErrorMessage>
      ) : (
        <FormHelperText fontWeight="500" color="gray.500">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
